import express from "express";
import passport from "passport";
import CartController from "../controllers/cart.controller.js";

const router = express.Router();
const cartController = new CartController();

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/faillogin",
  }),
  async (req, res) => {
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
);

router.get("/faillogin", (req, res) => {
  res.send("Inicio de sesión fallido");
});

router.get("/logout", async (req, res) => {
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
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/githubcallback",
  passport.authenticate("github", {
    failureRedirect: "/login",
  }),
  async (req, res) => {
    try {
      const userWithCart = req.user;
      if (!userWithCart.cart) {
        const newCart = await cartController.createCart();
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
      res.status(500).send("Error en el inicio de sesión");
    }
  }
);

export default router;
