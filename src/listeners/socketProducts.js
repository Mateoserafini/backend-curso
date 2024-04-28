// Importa el controlador de productos MongoDB
import ProductManager from "../Dao/controllers/Mongo/productManagerMongo.js";
// Importa la constante __dirname desde el archivo utils
import { __dirname } from "../utils.js";

// Crea una nueva instancia de ProductManager
const prodM = new ProductManager();

// Función para manejar las conexiones de socket relacionadas con productos
const socketProducts = (socketServer) => {
  // Escucha el evento de conexión de un nuevo socket
  socketServer.on("connection", async (socket) => {
    // Obtiene la lista de productos actualizada
    const listadeproductos = await prodM.getProductsView();
    // Envía la lista de productos a todos los clientes
    socketServer.emit("enviodeproducts", listadeproductos);

    // Maneja el evento "addProduct" cuando se agrega un nuevo producto
    socket.on("addProduct", async (obj) => {
      // Añade un nuevo producto a la base de datos
      await prodM.addProduct(obj);
      // Obtiene la lista de productos actualizada
      const listadeproductos = await prodM.getProductsView();
      // Envía la lista de productos actualizada a todos los clientes
      socketServer.emit("enviodeproducts", listadeproductos);
    });

    // Maneja el evento "deleteProduct" cuando se elimina un producto
    socket.on("deleteProduct", async (id) => {
      // Elimina el producto con el ID especificado de la base de datos
      await prodM.deleteProduct(id);
      // Obtiene la lista de productos actualizada
      const listadeproductos = await prodM.getProductsView();
      // Envía la lista de productos actualizada a todos los clientes
      socketServer.emit("enviodeproducts", listadeproductos);
    });
  });
};

// Exporta la función para manejar las conexiones de socket relacionadas con productos
export default socketProducts;

