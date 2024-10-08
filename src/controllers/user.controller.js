import CartController from "../controllers/cart.controller.js";
import UsuarioModel from "../models/usuario.model.js"; // Asegúrate de que la ruta sea correcta
import EmailManager from "../services/email.js";
import { generarResetToken } from "../utils/tokenreset.js";
import bcrypt from "bcryptjs";

const cartController = new CartController();
const emailManager = new EmailManager();

function createUserDTO(user) {
  return {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    cart: user.cart,
    lastLogin: user.lastLogin,
  };
}

class UserController {
  async register(req, res) {
    if (!req.user) {
      return res.status(400).send("Credenciales inválidas");
    }

    try {
      const cartUser = await cartController.createCart();
      console.log("cart desde user:" + cartUser);
      req.user.cart = cartUser._id;
      console.log(req.user);
      await req.user.save();

      req.session.user = createUserDTO(req.user);
      req.session.login = true;

      res.redirect("/profile");
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      res.status(500).send("Error al crear el usuario");
    }
  }

  getCurrentUser(req, res) {
    if (!req.user) {
      return res.status(400).send("Credenciales inválidas");
    }
    try {
      const currentUser = createUserDTO(req.user);
      res.json(currentUser);
    } catch (error) {
      console.error("Error al mostrar usuario:", error);
      res.status(500).send("Error al mostrar usuario");
    }
  }

  async getUsers() {
    try {
      const users = await UsuarioModel.find(
        {},
        "first_name last_name email role"
      );
      return users;
    } catch (error) {
      console.error("Error al obtener todos los usuarios: ", error);
      throw error; 
    }
  }

  async deleteInactiveUsers(req, res) {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // Dos días
    try {
      const inactiveUsers = await UsuarioModel.find({
        lastLogin: { $lt: twoDaysAgo },
        role: "user",
      });

      if (inactiveUsers.length === 0) {
        return res.status(200).send("No hay usuarios inactivos para eliminar.");
      }

      for (const user of inactiveUsers) {
        await emailManager.enviarCorreoEliminacionCuenta(user.email, user.first_name);        
        await UsuarioModel.findByIdAndDelete(user._id);
      }

      res.status(200).send("Usuarios inactivos eliminados correctamente.");
    } catch (error) {
      console.error("Error al eliminar a los usuarios inactivos: ", error);
      res.status(500).send("Error al eliminar a los usuarios inactivos.");
    }
  }

  async deleteUser(req, res) {
    const { uid } = req.params;

    try {
      await UsuarioModel.findByIdAndDelete(uid);
      res.redirect('/adminUsers');
    } catch (error) {
      res.status(500).send("Error al eliminar el usuario");
    }
  }

  async updateUserRole(req, res) {
    const { uid } = req.params;
    const { role } = req.body;

    try {
      await UsuarioModel.findByIdAndUpdate(uid, { role });
      res.redirect('/adminUsers');
    } catch (error) {
      res.status(500).send("Error al actualizar el rol del usuario");
    }
  }
  

  failedRegister(req, res) {
    res.send("Registro fallido");
  }

  async login(req, res) {
    try {
      if (!req.user) {
        return res.status(400).send("Credenciales inválidas");
      }
      await UsuarioModel.findByIdAndUpdate(req.user._id, {
        lastLogin: new Date(),
      });
      console.log("lastlogin");
      req.session.user = createUserDTO(req.user);
      req.session.login = true;
      res.redirect("/profile");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      res.status(500).send("Error en el inicio de sesión");
    }
  }

  failLogin(req, res) {
    res.send("Inicio de sesión fallido");
  }

  async logout(req, res) {
    if (req.session && req.session.login) {
      try {
        await new Promise((resolve, reject) =>
          req.session.destroy((err) => (err ? reject(err) : resolve()))
        );
        res.redirect("/login");
      } catch (err) {
        res.status(500).send("Error al cerrar sesión");
      }
    } else {
      res.redirect("/login");
    }
  }

  async githubCallback(req, res, next) {
    try {
      const userWithCart = req.user;
      if (!userWithCart.cart) {
        const newCart = await cartController.createCart(req, res);
        userWithCart.cart = newCart._id;
        await userWithCart.save();
      }
      await UsuarioModel.findByIdAndUpdate(req.user._id, {
        lastLogin: new Date(),
      });
      console.log("lastlogin");
      req.session.user = createUserDTO(userWithCart);
      req.session.login = true;
      res.redirect("/profile");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      next(error);
    }
  }

  async requestPasswordReset(req, res) {
    const { email } = req.body;
    try {
      console.log("Iniciando requestPasswordReset con email:", email);

      const user = await UsuarioModel.findOne({ email });
      if (!user) {
        console.log("Usuario no encontrado con email:", email);
        return res.status(404).send("Usuario no encontrado");
      }

      console.log("Usuario encontrado:", user);

      const token = generarResetToken();
      user.resetToken = {
        token: token,
        expire: new Date(Date.now() + 3600000), // 1 hora
      };

      console.log("Token generado:", token);

      await user.save();
      console.log("Usuario guardado con token de restablecimiento");

      await emailManager.enviarCorreoRestablecimiento(
        email,
        user.first_name,
        token
      );
      console.log("Correo de restablecimiento enviado a:", email);

      res.redirect("/confirmacionEnvio");
    } catch (error) {
      console.error("Error en requestPasswordReset:", error);
      res.status(500).send("Error interno del servidor");
    }
  }

  async resetPassword(req, res) {
    const { email, password, token } = req.body;
    try {
      console.log(
        "Iniciando resetPassword con email:",
        email,
        "y token:",
        token
      );

      const user = await UsuarioModel.findOne({ email });
      if (!user) {
        console.log("Usuario no encontrado con email:", email);
        return res.render("passwordreset", { error: "Usuario no encontrado" });
      }

      console.log("Usuario encontrado:", user);

      const resetToken = user.resetToken;
      if (!resetToken || resetToken.token !== token) {
        console.log("Token inválido:", token);
        return res.render("resetPassword", { error: "El token es inválido" });
      }

      const ahora = new Date();
      if (ahora > resetToken.expire) {
        console.log("Token expirado:", token);
        return res.render("resetPassword", { error: "El token ha expirado" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        console.log("La nueva contraseña no puede ser igual a la anterior");
        return res.render("resetPassword", {
          //aca esta el error
          error: "La nueva contraseña no puede ser igual a la anterior",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.resetToken = undefined;
      await user.save();

      console.log("Contraseña actualizada para el usuario:", email);

      res.redirect("/login");
    } catch (error) {
      console.error("Error en resetPassword:", error);
      res
        .status(500)
        .render("passwordreset", { error: "Error interno del servidor" });
    }
  }
}

export default UserController;
