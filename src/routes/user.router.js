import express from "express";
const router = express.Router();
import UsuarioModel from "../dao/models/usuario.model.js";
import bcrypt from "bcryptjs";
const ADMIN = "matuserafini@gmail.com";
import passport from "passport";
import { get } from "mongoose";

/* mongo db version
router.post("/", async (req, res) => {
    const { first_name, last_name, email, password, age, role } = req.body;
    
    try {
        const userFound = await UsuarioModel.findOne({email:email});

        if (userFound) {
            return res.status(400).send('El email ya existe');
        }

        const isAdmin = (email === ADMIN);
        const passwordHash = await bcrypt.hash(password, 10);

        const nuevoUsuario = await UsuarioModel.create({
            first_name,
            last_name,
            email,
            password: passwordHash,
            age,
            role: isAdmin,
        });

        req.session.user = {
            email: nuevoUsuario.email,
            first_name: nuevoUsuario.first_name,
            role: nuevoUsuario.role,
        };

        req.session.login = true;

        res.status(200).send('usuario creado con exito'
        );
        
    } catch (error) {
        console.error("Error al crear el usuario:", error); // Para depuración adicional
        res.status(500).send('Error al crear el usuario');
    }
}); */

/* passport version */

router.post(
  "/",
  passport.authenticate("register", { failureRedirect: "/failedRegister" }),
  async (req, res) => {
    // Si no se ha autenticado un usuario, las credenciales son inválidas
    if (!req.user) return res.status(400).send("Credenciales inválidas");

    try {
      // Crear sesión de usuario
      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        role: req.user.role,
        cart: req.user.cart,
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

router.get("/current", (req, res) =>{
  if(!req.user) {
    return res.status(400).send("Credenciales inválidas");
  }
  try {
    const curretUser = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      role: req.user.role,
      cart: req.user.cart,
    }
    res.json(curretUser)
    
  } catch (error) {
    res.status(400).send("error al mostrar usuario");
  }
})

router.get("/failedRegister", (req, res) => {
  res.send("Registro fallido");
});

export default router;
