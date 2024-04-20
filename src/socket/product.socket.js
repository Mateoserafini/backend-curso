import { ProductManager } from "../controllers/productManager.js";

const productManager = new ProductManager();

const socketProducts = (socketServer) => {
  // Obtener lista de productos en el endpoint http://localhost:8080/realTimeProducts
  socketServer.on("connection", async (socket) => {
    const productList = await productManager.getProducts();
    socketServer.emit("enviando productos", productList);

    //Eliminar producto por Id
    socket.on("deleteProduct", async (id) => {
      await prod.deleteProduct(id);
      const listadeproductos = await productManager.getProducts();
      socketServer.emit("enviando productos", listadeproductos);
    });
  });
};

export default socketProducts;