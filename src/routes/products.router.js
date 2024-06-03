import { Router } from "express";
import ProductController from "../controllers/product.controller.js";

const productController = new ProductController();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const productsData = await productController.getProducts(req.query);
    res.json(productsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/:pid", async (req, res) => {
  const id = req.params.pid;

  try {
    const producto = await productController.getProductById(id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    console.error("Error al obtener producto", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    const nuevoProducto = await productController.addProduct(req.body);
    res.json({ status: "success", nuevoProducto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  const productoActualizado = req.body;

  try {
    await productController.updateProduct(id, productoActualizado);
    res.json({ message: "Producto actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar producto", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/:pid", async (req, res) => {
  const id = req.params.pid;

  try {
    await productController.deleteProduct(id);
    res.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar producto", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
