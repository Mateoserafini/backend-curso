import { Router } from "express";
import { __dirname } from "../utils.js";
import ProductManager from "../Dao/controllers/Mongo/productManagerMongo.js";

const prodM = new ProductManager(); // Crea una instancia de ProductManager

const routerP = Router(); // Crea una instancia del enrutador de Express para productos

// Ruta para obtener la lista de productos, opcionalmente filtrada por consultas
routerP.get("/", async (req, res) => {
  try {
    const products = await prodM.getProducts(req.query); // Obtiene productos con consultas opcionales
    res.json({ products }); // Responde con los productos en formato JSON
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: "Error interno del servidor" }); // Responde con un error interno del servidor
  }
});

// Ruta para obtener un producto por su ID
routerP.get("/:pid", async (req, res) => {
  const id = req.params.pid; // Obtiene el ID del producto de la URL

  try {
    const producto = await prodM.getProductById(id); // Obtiene el producto por su ID
    if (!producto) {
      // Si el producto no se encuentra
      return res.json({ error: "Producto no encontrado" }); // Responde con un mensaje de error
    }

    res.json(producto); // Responde con el producto en formato JSON
  } catch (error) {
    console.error("Error al obtener producto", error); // Imprime el error en la consola
    res.status(500).json({ error: "Error interno del servidor" }); // Responde con un error interno del servidor
  }
});

// Ruta para agregar un nuevo producto
routerP.post("/", async (req, res) => {
  try {
    const newproduct = await prodM.addProduct(req.body); // Agrega un nuevo producto
    res.json({ status: "success", newproduct }); // Responde con el nuevo producto en formato JSON
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: "Error interno del servidor" }); // Responde con un error interno del servidor
  }
});

// Ruta para actualizar un producto por su ID
routerP.put("/:pid", async (req, res) => {
  const id = req.params.pid; // Obtiene el ID del producto de la URL
  const productoActualizado = req.body; // Obtiene los datos actualizados del producto

  try {
    await prodM.updateProduct(id, productoActualizado); // Actualiza el producto por su ID
    res.json({ message: "Producto actualizado exitosamente" }); // Responde con un mensaje de éxito
  } catch (error) {
    console.error("Error al actualizar producto", error); // Imprime el error en la consola
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
    console.error("Error al eliminar producto", error); // Imprime el error en la consola
    res.status(500).json({ error: "Error interno del servidor" }); // Responde con un error interno del servidor
  }
});

export default routerP; // Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación

