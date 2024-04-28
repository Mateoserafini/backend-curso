// Importa las dependencias necesarias
import express from "express"; // Importa la biblioteca express para crear el servidor web
import { __dirname } from "./utils.js"; // Importa la función para obtener el directorio actual
import handlebars from "express-handlebars"; // Importa el motor de plantillas handlebars
import { Server } from "socket.io"; // Importa la biblioteca para trabajar con WebSocket
import "./database.js"; // Importa la configuración de la base de datos
import "dotenv/config"; // Importa las variables de entorno
import routerProduct from "./routes/products.router.js"; // Importa las rutas de productos
import routerViews from "./routes/views.router.js"; // Importa las rutas para las vistas
import cartRouter from "./routes/cart.router.js"; // Importa las rutas para carritos
import socketProducts from "./listeners/socketProducts.js"; // Importa el controlador de productos para WebSocket
import socketChat from "./listeners/socketChat.js"; // Importa el controlador de chat para WebSocket

// Crea una instancia de la aplicación Express
const app = express();
// Obtiene el puerto desde las variables de entorno
const PORT = process.env.PORT;

// Configura middleware para manejar JSON y archivos estáticos
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// Configura el motor de plantillas handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Configura las rutas de la aplicación
app.use("/api/products", routerProduct);
app.use("/api/carts", cartRouter);
app.use("/", routerViews);

// Inicia el servidor HTTP y escucha en el puerto especificado
const httpServer = app.listen(PORT, () => {
  console.log(PORT, `Escuchando en http://localhost:${PORT}`);
});

// Crea un servidor WebSocket utilizando el servidor HTTP
const socketServer = new Server(httpServer);

// Inicializa los controladores de WebSocket
socketProducts(socketServer);
socketChat(socketServer);
