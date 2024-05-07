import express from 'express';
const router = express.Router();
import UsuarioModel from "../dao/models/usuario.model.js";
import bcrypt from 'bcryptjs';
const ADMIN = 'matuserafini@gmail.com';

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
});

export default router;
