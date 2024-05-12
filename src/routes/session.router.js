import express from "express";
const router = express.Router();
import UsuarioModel from "../dao/models/usuario.model.js";
import bcrypt from "bcryptjs";
import passport from "passport";

/* router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await UsuarioModel.findOne({ email });
        
        if (userFound) {
            const isMatch = await bcrypt.compare(password, userFound.password);

            if (isMatch) {
                req.session.login = true;
                req.session.user = {
                    email: userFound.email,
                    first_name: userFound.first_name,
                };
                res.redirect("/");
            } else {
                res.status(401).send("Contraseña no válida");
            }
        } else {
            res.status(404).send("Usuario no encontrado");
        }
    } catch (error) {
        res.status(500).send("Error en el login");
        console.error("Error en el login:", error); // Para depuración adicional
    }
}); */

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/faillogin",
  }),
  async (req, res) => {
    try {
      // Si no hay usuario en la sesión, las credenciales son inválidas
      if (!req.user) {
        return res.status(400).send("Credenciales inválidas");
      }

      // Asignar la información del usuario a la sesión
      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
      };

      // Establecer la sesión como autenticada
      req.session.login = true;

      // Redirigir al perfil del usuario
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
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", {
    failureRedirect: "/login",
  }),
  async (req, res) => {
    //La estrategia de Github nos retornará el usuario, entonces los agrego a mi objeto de Session:
    req.session.user = req.user;
    req.session.login = true;
    res.redirect("/profile");
  }
);

export default router;
