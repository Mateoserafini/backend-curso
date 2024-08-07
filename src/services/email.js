import nodemailer from "nodemailer"
import configObject from "../config/config.js";

class EmailManager {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: configObject.mailerUser, 
                pass: configObject.mailerPassword
            }
        })
    }

    async enviarCorreoCompra(first_name, ticket) {
        try {
            const mailOptions = {
                from: "matuserafini@gmail.com",
                to: ticket.purchaser,
                subject: "Confirmación de Compra",
                html: `
                    <h1>Confirmación de Compra</h1>
                    <p>Hola ${first_name},</p>
                    <p>Gracias por tu compra. A continuación, encontrarás los detalles de tu pedido:</p>
                    <p>Número de orden: <strong>${ticket.code}</strong></p>
                    <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
                    <p>Saludos,</p>
                    <p>El equipo de coder Ecommerse</p>
                `
            };
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.log("Error al enviar el correo de confirmación de compra", error);
        }
    }
    
    async enviarCorreoRestablecimiento(email, first_name, token) {
        try {
            const mailOptions = {
                from: "matuserafini@gmail.com",
                to: email,
                subject: "Restablecimiento de Contraseña",
                html: `
                    <h1>Restablecimiento de Contraseña</h1>
                    <p>Hola ${first_name},</p>
                    <p>Hemos recibido una solicitud para restablecer tu contraseña. Utiliza el siguiente código para completar el proceso:</p>
                    <p>Código de confirmación: <strong>${token}</strong></p>
                    <p>Este código expira en una hora.</p>
                    <p>Puedes restablecer tu contraseña haciendo clic en el siguiente enlace:</p>
                    <a href="http://localhost:8080/password">Restablecer Contraseña</a>
                    <p>Si no solicitaste este cambio, por favor ignora este correo.</p>
                    <p>Saludos,</p>
                    <p>El equipo de coder Ecommerse</p>
                `
            };
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.log("Error al enviar el correo de restablecimiento de contraseña", error);
        }
    }

}

export default EmailManager;