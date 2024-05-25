import ProductManager from "../dao/controllers/Mongo/productManagerMongo.js";
import { __dirname } from "../utils.js";

const prodM = new ProductManager();

const socketProducts = (socketServer) => {
  socketServer.on("connection", async (socket) => {
    const listaDeProductos = await prodM.getProductsView();
    socketServer.emit("enviodeproducts", listaDeProductos);

    socket.on("addProduct", async (obj) => {
      await prodM.addProduct(obj);
      const listaDeProductos = await prodM.getProductsView();
      socketServer.emit("enviodeproducts", listaDeProductos);
    });

    socket.on("deleteProduct", async (id) => {
      await prodM.deleteProduct(id);
      const listaDeProductos = await prodM.getProductsView();
      socketServer.emit("enviodeproducts", listaDeProductos);
    });
  });
};

export default socketProducts;
