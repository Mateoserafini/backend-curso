import express from 'express';
const router = express.Router();
import UsuarioModel from '../dao/models/usuario.model.js';
import bcrypt from 'bcryptjs';

router.post("/login", async (req, res) => {
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
});

router.get("/logout", async (req, res) => {
    if (req.session && req.session.login) {
        try {
            await new Promise((resolve, reject) => req.session.destroy(err => err ? reject(err) : resolve()));
            res.redirect("/login");
        } catch (err) {
            res.status(500).send("Error al cerrar sesión");
        }
    } else {
        res.redirect("/login");
    }
});

export default router;