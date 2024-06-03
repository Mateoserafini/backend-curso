import ProductController from "../controllers/product.controller.js";
import { __dirname } from "../utils.js";

const productController = new ProductController();

const socketProducts = (socketServer) => {
  socketServer.on("connection", async (socket) => {
    const listaDeProductos = await productController.getProductsView();
    socketServer.emit("enviodeproducts", listaDeProductos);

    socket.on("addProduct", async (obj) => {
      await productController.addProduct(obj);
      const listaDeProductos = await productController.getProductsView();
      socketServer.emit("enviodeproducts", listaDeProductos);
    });

    socket.on("deleteProduct", async (id) => {
      await productController.deleteProduct(id);
      const listaDeProductos = await productController.getProductsView();
      socketServer.emit("enviodeproducts", listaDeProductos);
    });
  });
};

export default socketProducts;
