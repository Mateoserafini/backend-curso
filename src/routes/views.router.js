import { Router } from "express";
import ProductManager from "../Dao/controllers/Mongo/productManagerMongo.js";
import { __dirname } from "../utils.js";

const prodM = new ProductManager(); // Crea una instancia de ProductManager
const router = Router(); // Crea una instancia del enrutador de Express

// Ruta para renderizar la vista principal con la lista de productos
router.get("/", async (req, res) => {
  try {
    const listadeproductos = await prodM.getProductsView(); // Obtiene la lista de productos para la vista
    res.render("home", { listadeproductos }); // Renderiza la vista "home" con la lista de productos
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: "Error interno del servidor" }); // Responde con un error interno del servidor
  }
});

// Ruta para renderizar la vista "realtimeproducts" (productos en tiempo real)
router.get("/realtimeproducts", (req, res) => {
  try {
    res.render("realtimeproducts"); // Renderiza la vista "realtimeproducts"
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: "Error interno del servidor" }); // Responde con un error interno del servidor
  }
});

// Ruta para renderizar la vista "chat"
router.get("/chat", (req, res) => {
  try {
    res.render("chat"); // Renderiza la vista "chat"
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: "Error interno del servidor" }); // Responde con un error interno del servidor
  }
});

export default router; // Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación
