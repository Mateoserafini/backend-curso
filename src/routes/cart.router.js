import { Router } from "express";
import { __dirname } from "../utils.js";
import CartManager from "../Dao/controllers/Mongo/cartManager.js";

const cartM = new CartManager(); // Crea una instancia de CartManager

const router = Router(); // Crea una instancia del enrutador de Express

// Ruta para agregar un nuevo carrito
router.post("/", async (req, res) => {
  try {
    const newCart = await cartM.addCart(); // Llama al método addCart() para crear un nuevo carrito
    res.json(newCart); // Envía el nuevo carrito como respuesta en formato JSON
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: "Error interno del servidor" }); // Responde con un error interno del servidor
  }
});

// Ruta para obtener un carrito por su ID
router.get("/:cid", async (req, res) => {
  const cartId = req.params.cid; // Obtiene el ID del carrito de la URL
  try {
    const carrito = await cartM.getCartById(cartId); // Llama al método getCartById() para obtener el carrito por su ID
    res.json(carrito.products); // Envía los productos del carrito como respuesta en formato JSON
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: "Error interno del servidor" }); // Responde con un error interno del servidor
  }
});

// Ruta para agregar un producto a un carrito específico
router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid; // Obtiene el ID del carrito de la URL
  const productId = req.params.pid; // Obtiene el ID del producto de la URL
  const quantity = req.body.quantity; // Obtiene la cantidad del producto del cuerpo de la solicitud
  try {
    const actualizarCarrito = await cartM.addProductToCart(
      cartId,
      productId,
      quantity
    );
    res.json(actualizarCarrito.products); // Envía los productos actualizados del carrito como respuesta en formato JSON
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: "Error interno del servidor" }); // Responde con un error interno del servidor
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  try {
      const carritoActualizado = await cartM.deleteProductFromCart(cartId, productId);
      res.json(carritoActualizado.products);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const productsArray = req.body.products; // Obtiene el arreglo de productos del cuerpo de la solicitud
  try {
      const carritoActualizado = await cartM.updateCart(cartId, productsArray);
      res.json(carritoActualizado.products);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const newQuantity = req.body.quantity; // Obtiene la nueva cantidad del cuerpo de la solicitud
  try {
      const carritoActualizado = await cartM.updateProductQuantity(cartId, productId, newQuantity);
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

export default router; // Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación

