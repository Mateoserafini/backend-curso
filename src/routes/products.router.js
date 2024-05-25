import { Router } from "express";
import ProductManager from "../dao/controllers/Mongo/productManagerMongo.js";

const prodM = new ProductManager();
const routerP = Router();

routerP.get("/", async (req, res) => {
  try {
    const productsData = await prodM.getProducts(req.query);
    res.json(productsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

routerP.get("/:pid", async (req, res) => {
  const id = req.params.pid;

  try {
    const producto = await prodM.getProductById(id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    console.error("Error al obtener producto", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

routerP.post("/", async (req, res) => {
  try {
    const nuevoProducto = await prodM.addProduct(req.body);
    res.json({ status: "success", nuevoProducto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

routerP.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  const productoActualizado = req.body;

  try {
    await prodM.updateProduct(id, productoActualizado);
    res.json({ message: "Producto actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar producto", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

routerP.delete("/:pid", async (req, res) => {
  const id = req.params.pid;

  try {
    await prodM.deleteProduct(id);
    res.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar producto", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default routerP;
