import CartController from "../controllers/cart.controller.js";

const cartController = new CartController();

function createUserDTO(user) {
  return {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
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

  failedRegister(req, res) {
    res.send("Registro fallido");
  }

  async login(req, res) {
    try {
      if (!req.user) {
        return res.status(400).send("Credenciales inválidas");
      }

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

      req.session.user = createUserDTO(userWithCart);
      req.session.login = true;
      res.redirect("/profile");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      next(error);
    }
  }
}

export default UserController;
