import CartController from "../controllers/cart.controller.js";

const cartController = new CartController();

class UserController {
  async register(req, res) {
    if (!req.user) {
      return res.status(400).send("Credenciales inválidas");
    }

    try {
      const cartUser = await cartController.createCart();
      req.user.cart = cartUser._id;
      await req.user.save();

      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        role: req.user.role,
        cart: cartUser._id,
      };
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
      const currentUser = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        role: req.user.role,
        cart: req.user.cart,
      };
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

      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        role: req.user.role,
        cart: req.user.cart,
      };

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

      req.session.user = {
        first_name: userWithCart.first_name,
        last_name: userWithCart.last_name,
        age: userWithCart.age,
        email: userWithCart.email,
        role: userWithCart.role,
        cart: userWithCart.cart,
      };

      req.session.login = true;
      res.redirect("/profile");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      next(error); 
    }
  }
}

export default UserController;
