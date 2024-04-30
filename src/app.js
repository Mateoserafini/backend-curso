// Importa las dependencias necesarias
import express from "express"; // Importa la biblioteca Express para crear el servidor web
import { __dirname } from "./utils.js"; // Importa la función para obtener el directorio actual
import handlebars from "express-handlebars"; // Importa el motor de plantillas Handlebars
import { Server } from "socket.io"; // Importa la biblioteca para trabajar con WebSocket
import "./database.js"; // Importa la configuración de la base de datos
import "dotenv/config"; // Importa las variables de entorno desde el archivo .env
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
app.use(express.json()); // Configura el manejo de datos en formato JSON
app.use(express.static(__dirname + "/public")); // Configura el acceso a archivos estáticos en la carpeta "public"

// Configura el motor de plantillas Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views"); // Establece el directorio de las vistas
app.set("view engine", "handlebars"); // Establece Handlebars como motor de plantillas

// Configura las rutas de la aplicación
app.use("/api/products", routerProduct); // Establece las rutas para productos
app.use("/api/carts", cartRouter); // Establece las rutas para carritos
app.use("/", routerViews); // Establece las rutas para las vistas

// Inicia el servidor HTTP y escucha en el puerto especificado
const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando en http://localhost:${PORT}`); // Muestra un mensaje indicando que el servidor está escuchando
});

// Crea un servidor WebSocket utilizando el servidor HTTP
const socketServer = new Server(httpServer);

// Inicializa los controladores de WebSocket
socketProducts(socketServer); // Inicializa el controlador de productos
socketChat(socketServer); // Inicializa el controlador de chat
