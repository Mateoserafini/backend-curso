import express from 'express';
import exphbs from 'express-handlebars';
import { Server } from 'socket.io';
import './config/mongoose.js';

const app = express();
const PUERTO = 8080;

// Importar routers
import productRouter from './routers/product.router.js';
import cartRouter from './routers/cart.router.js';
import viewsRouter from './routers/views.router.js';

// Importar modelo de mensaje
import messageModel from './dao/models/message.model.js';



// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));

// Configuración de Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Configuración de rutas
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

// Iniciar servidor HTTP
const httpServer = app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});

// Inicializar instancia de Socket.io
const io = new Server(httpServer);

// Evento de conexión
io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");

    // Escuchar evento "message"
    socket.on("message", async data => {


        await messageModel.create(data);

        const messages = await messageModel.find();
        io.sockets.emit("message", messages);
     
    })
});
