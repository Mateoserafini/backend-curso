import { Router } from "express";
import ProductManager from "../Dao/controllers/Mongo/productManagerMongo.js";
import { __dirname } from "../utils.js";

// Importa los modelos que se utilizarán para manejar las consultas a la base de datos
import { productsModel } from "../Dao/models/products.model.js";
import {cartModel} from "../Dao/models/cart.model.js";

const prodM = new ProductManager();
const router = Router(); // Crea una instancia del enrutador de Express

// Ruta para renderizar la vista principal con la lista de productos
router.get("/", async (req, res) => {
  try {
    const listadeproductos = await prodM.getProductsView();
    res.render("home", { listadeproductos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para renderizar la vista "realtimeproducts" (productos en tiempo real)
router.get("/realtimeproducts", (req, res) => {
  try {
    res.render("realtimeproducts");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para renderizar la vista "chat"
router.get("/chat", (req, res) => {
  try {
    res.render("chat");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para obtener la lista de productos con paginación
router.get('/products', async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  try {

    
    const options = {
      page: page,
      limit: limit,
      lean: true,
      leanWithId: false
    };

    const result = await productsModel.paginate({}, options);
    console.log(result)

    res.render('products', {
      products: result.docs,
      page: result.page,
      totalPages: result.totalPages,
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      limit: result.limit
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para obtener los detalles de un carrito por su ID
router.get('/carts/:cid', async (req, res) => {
  const cartId = req.params.cid;

  try {
    const cart = await cartModel.findById(cartId).populate('products.product');

    if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" });
    }

    // Calcular el subtotal de cada producto y añadirlo al objeto de producto
    const productsWithSubtotals = cart.products.map(item => {
        return {
            ...item.toObject(),
            subtotal: item.quantity * item.product.price
        };
    });

    // Renderizar la plantilla 'cart' con los productos y sus subtotales
    res.render('carts', { products: productsWithSubtotals });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
