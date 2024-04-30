import { Router } from "express";
import CartManager from "../Dao/controllers/Mongo/cartManager.js";

const cartM = new CartManager(); // Crea una instancia de CartManager

const router = Router(); // Crea una instancia del enrutador de Express

// Ruta para crear un nuevo carrito
router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartM.createCart(); // Crea un nuevo carrito
        res.json(nuevoCarrito); // Envía el nuevo carrito como respuesta en formato JSON
    } catch (error) {
        console.error(error); // Muestra el error en la consola
        res.status(500).json({ error: "Error interno del servidor" }); // Responde con un mensaje de error
    }
});

// Ruta para obtener un carrito por su ID
router.get("/:cid", async (req, res) => {
    const cartId = req.params.cid; // Obtiene el ID del carrito de la URL
    try {
        const carrito = await cartM.getCartById(cartId); // Obtiene el carrito por su ID
        res.json(carrito.products); // Envía los productos del carrito como respuesta en formato JSON
    } catch (error) {
        console.error(error); // Muestra el error en la consola
        res.status(500).json({ error: "Error interno del servidor" }); // Responde con un mensaje de error
    }
});

// Ruta para agregar un producto a un carrito específico
router.post("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid; // Obtiene el ID del carrito de la URL
    const productId = req.params.pid; // Obtiene el ID del producto de la URL
    const quantity = req.body.quantity; // Obtiene la cantidad del producto del cuerpo de la solicitud

    try {
        const carritoActualizado = await cartM.addProductToCart(cartId, productId, quantity);
        res.json(carritoActualizado.products); // Envía los productos actualizados del carrito como respuesta en formato JSON
    } catch (error) {
        console.error(error); // Muestra el error en la consola
        res.status(500).json({ error: "Error interno del servidor" }); // Responde con un mensaje de error
    }
});

// Ruta para eliminar un producto de un carrito específico
router.delete("/:cid/products/:pid", async (req, res) => {
    const cartId = req.params.cid; // Obtiene el ID del carrito de la URL
    const productId = req.params.pid; // Obtiene el ID del producto de la URL

    try {
        // Llama al método para eliminar un producto del carrito
        const carritoActualizado = await cartM.deleteProductFromCart(cartId, productId);

        // Verifica si el carrito se actualizó correctamente
        if (!carritoActualizado) {
            return res.status(404).json({ error: "No se encontró el carrito o el producto" });
        }

        // Responde con los productos actualizados del carrito
        res.json(carritoActualizado.products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Ruta para actualizar un carrito completo
router.put("/:cid", async (req, res) => {
    const cartId = req.params.cid; // Obtiene el ID del carrito de la URL
    const productsArray = req.body.products; // Obtiene el arreglo de productos del cuerpo de la solicitud

    try {
        const carritoActualizado = await cartM.updateCart(cartId, productsArray);
        res.json(carritoActualizado.products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Ruta para actualizar la cantidad de un producto en un carrito específico
router.put("/:cid/products/:pid", async (req, res) => {
    const cartId = req.params.cid; // Obtiene el ID del carrito de la URL
    const productId = req.params.pid; // Obtiene el ID del producto de la URL
    const nuevaCantidad = req.body.quantity; // Obtiene la nueva cantidad del producto del cuerpo de la solicitud

    try {
        const carritoActualizado = await cartM.updateProductQuantity(cartId, productId, nuevaCantidad);
        res.json(carritoActualizado.products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Ruta para eliminar todos los productos de un carrito específico
router.delete("/:cid", async (req, res) => {
    const cartId = req.params.cid; // Obtiene el ID del carrito de la URL

    try {
        const carritoActualizado = await cartM.deleteAllProductsFromCart(cartId);
        res.json(carritoActualizado.products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router; // Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación
