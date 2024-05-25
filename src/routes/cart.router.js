import { Router } from "express";
import CartManager from "../dao/controllers/Mongo/cartManager.js";

const cartM = new CartManager();
const router = Router();

router.post("/", async (req, res) => {
  try {
    const nuevoCarrito = await cartM.createCart();
    res.json(nuevoCarrito);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  try {
    const carrito = await cartM.getCartById(cartId);
    res.json(carrito.products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const { quantity } = req.body;

  try {
    const carritoActualizado = await cartM.addProductToCart(cartId, productId, quantity);
    res.json(carritoActualizado.products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  try {
    const carritoActualizado = await cartM.deleteProductFromCart(cartId, productId);
    if (!carritoActualizado) {
      return res.status(404).json({ error: "No se encontró el carrito o el producto" });
    }
    res.json(carritoActualizado.products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const { products } = req.body;

  try {
    const carritoActualizado = await cartM.updateCart(cartId, products);
    res.json(carritoActualizado.products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const { quantity } = req.body;

  try {
    const carritoActualizado = await cartM.updateProductQuantity(cartId, productId, quantity);
    res.json(carritoActualizado.products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/:cid", async (req, res) => {
  const cartId = req.params.cid;

  try {
    const carritoActualizado = await cartM.deleteAllProductsFromCart(cartId);
    res.json(carritoActualizado.products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
