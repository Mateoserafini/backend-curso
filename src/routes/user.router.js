// user.router.js
import express from "express";
import passport from "passport";
import UserController from "../controllers/user.controller.js";

const router = express.Router();
const userController = new UserController();


// Registro de usuario
router.post("/", passport.authenticate("register", { failureRedirect: "/failedRegister" }), userController.register);

// Obtener usuario actual
router.get("/current", userController.getCurrentUser);

// Falla de registro
router.get("/failedRegister", userController.failedRegister);

// Inicio de sesión
router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/api/sessions/faillogin" }),
  userController.login
);

// Falla de inicio de sesión
router.get("/faillogin", userController.failLogin);

// Cerrar sesión
router.get("/logout", userController.logout);

// Inicio de sesión con GitHub
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

// Callback de inicio de sesión con GitHub
router.get("/githubcallback", 
  passport.authenticate("github", { failureRedirect: "/login" }),
  userController.githubCallback
);

export default router;
