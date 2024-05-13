import { Router } from "express";
import ProductManager from "../dao/controllers/Mongo/productManagerMongo.js";

const prodM = new ProductManager(); // Crea una instancia de ProductManager

const routerP = Router(); // Crea una instancia del enrutador de Express para productos

// Ruta para obtener la lista de productos, opcionalmente filtrada por consultas
routerP.get("/", async (req, res) => {
  try {
    const productsData = await prodM.getProducts(req.query); // Llama a getProducts con los parámetros de consulta
    res.json(productsData); // Responde con los datos obtenidos en formato JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" }); // Responde con un error interno del servidor
  }
});

// Ruta para obtener un producto por su ID
routerP.get("/:pid", async (req, res) => {
  const id = req.params.pid; // Obtiene el ID del producto de la URL

  try {
    const producto = await prodM.getProductById(id); // Llama a getProductById con el ID del producto
    if (!producto) {
      return res.json({ error: "Producto no encontrado" }); // Responde con un mensaje de error si el producto no se encuentra
    }

    res.json(producto); // Responde con el producto en formato JSON
  } catch (error) {
    console.error("Error al obtener producto", error); // Muestra el error en la consola
    res.status(500).json({ error: "Error interno del servidor" }); // Responde con un error interno del servidor
  }
});

// Ruta para agregar un nuevo producto
routerP.post("/", async (req, res) => {
  try {
    const nuevoProducto = await prodM.addProduct(req.body); // Agrega un nuevo producto con los datos del cuerpo de la solicitud
    res.json({ status: "success", nuevoProducto }); // Responde con el nuevo producto en formato JSON
  } catch (error) {
    console.error(error); // Muestra el error en la consola
    res.status(500).json({ error: "Error interno del servidor" }); // Responde con un error interno del servidor
  }
});

// Ruta para actualizar un producto por su ID
routerP.put("/:pid", async (req, res) => {
  const id = req.params.pid; // Obtiene el ID del producto de la URL
  const productoActualizado = req.body; // Obtiene los datos actualizados del producto del cuerpo de la solicitud

  try {
    await prodM.updateProduct(id, productoActualizado); // Actualiza el producto por su ID
    res.json({ message: "Producto actualizado exitosamente" }); // Responde con un mensaje de éxito
  } catch (error) {
    console.error("Error al actualizar producto", error); // Muestra el error en la consola
    res.status(500).json({ error: "Error interno del servidor" }); // Responde con un error interno del servidor
  }
});

// Ruta para eliminar un producto por su ID
routerP.delete("/:pid", async (req, res) => {
  const id = req.params.pid; // Obtiene el ID del producto de la URL

  try {
    await prodM.deleteProduct(id); // Elimina el producto por su ID
    res.json({ message: "Producto eliminado exitosamente" }); // Responde con un mensaje de éxito
  } catch (error) {
    console.error("Error al eliminar producto", error); // Muestra el error en la consola
    res.status(500).json({ error: "Error interno del servidor" }); // Responde con un error interno del servidor
  }
});

export default routerP; // Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación
