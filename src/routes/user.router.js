import express from "express";
import passport from "passport";
import CartManager from "../dao/controllers/Mongo/cartManager.js";

const router = express.Router();
const cartManager = new CartManager();
const ADMIN = "matuserafini@gmail.com";

// Ruta para registrar un nuevo usuario con Passport
router.post(
  "/",
  passport.authenticate("register", { failureRedirect: "/failedRegister" }),
  async (req, res) => {
    // Si no se ha autenticado un usuario, las credenciales son inválidas
    if (!req.user) {
      return res.status(400).send("Credenciales inválidas");
    }

    try {
      // Crear un nuevo carrito
      const cartUser = await cartManager.createCart();

      // Guardar el cartId en el usuario
      req.user.cart = cartUser._id;
      await req.user.save();

      // Crear sesión de usuario
      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        role: req.user.role,
        cart: cartUser._id,
      };
      req.session.login = true;

      // Redirigir al perfil del usuario
      res.redirect("/profile");
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      res.status(500).send("Error al crear el usuario");
    }
  }
);

// Ruta para obtener el usuario actual
router.get("/current", (req, res) => {
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
});

// Ruta para manejar el fallo en el registro
router.get("/failedRegister", (req, res) => {
  res.send("Registro fallido");
});

export default router;
