import { Router } from "express";
import ProductManager from "../Dao/controllers/Mongo/productManagerMongo.js";
import { __dirname } from "../utils.js";

// Importa los modelos que se utilizarán para manejar las consultas a la base de datos
import { productsModel } from "../Dao/models/products.model.js";
import { cartModel } from "../Dao/models/cart.model.js";

const prodM = new ProductManager();
const router = Router(); // Crea una instancia del enrutador de Express

// Ruta para renderizar la vista principal con la lista de productos
router.get("/", async (req, res) => {
  if (!req.session.login) {
    return res.redirect('/login');
  }

  try {
    const user = req.session.user.first_name;
    const listadeproductos = await prodM.getProductsView();
    res.render("home", { listadeproductos, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para renderizar la vista 'realtimeproducts' (productos en tiempo real)
router.get("/realtimeproducts", (req, res) => {
  if(!req.session.login){
    return res.redirect('/login')
  }
  try {
    res.render("realtimeproducts"); // Renderiza la vista 'realtimeproducts'
  } catch (error) {
    console.error(error); // Muestra el error en la consola
    res.status(500).json({ error: "Error interno del servidor" }); // Responde con un error interno del servidor
  }
});

// Ruta para renderizar la vista 'chat'
router.get("/chat", (req, res) => {
  if(!req.session.login){
    return res.redirect('/login')
  }

  try {
    res.render("chat"); // Renderiza la vista 'chat'
  } catch (error) {
    console.error(error); // Muestra el error en la consola
    res.status(500).json({ error: "Error interno del servidor" }); // Responde con un error interno del servidor
  }
});

// Ruta para obtener la lista de productos con paginación
router.get('/products', async (req, res) => {

  if(!req.session.login){
    return res.redirect('/login')
  }

  let { page = 1, limit = 10 } = req.query; // Obtiene los parámetros de consulta para paginación
  page = parseInt(page, 10); // Convierte la página a un número entero
  limit = parseInt(limit, 10); // Convierte el límite a un número entero

  try {
    const options = {
      page: page,
      limit: limit,
      lean: true,
      leanWithId: false
    };

    const result = await productsModel.paginate({}, options); // Realiza la paginación de productos
    console.log(result);

    // Renderiza la vista 'products' con los datos de paginación
    res.render('products', {
      user: req.session.user.first_name,
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
    console.error(error); // Muestra el error en la consola
    res.status(500).json({ error: "Error interno del servidor" }); // Responde con un error interno del servidor
  }
});

// Ruta para obtener los detalles de un carrito por su ID
router.get('/carts/:cid', async (req, res) => {
  if(!req.session.login){
    return res.redirect('/login')
  }

  const cartId = req.params.cid; // Obtiene el ID del carrito

  try {
    // Busca el carrito por su ID y lo popula con los productos
    const cart = await cartModel.findById(cartId).populate('products.product');

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" }); // Responde con un error si el carrito no se encuentra
    }

    // Calcula el subtotal de cada producto y lo añade al objeto de producto
    const productsWithSubtotals = cart.products.map(item => {
        return {
            ...item.toObject(),
            subtotal: item.quantity * item.product.price
        };
    });

    // Renderiza la plantilla 'carts' con los productos y sus subtotales
    res.render('carts', { products: productsWithSubtotals });
  } catch (error) {
    console.error(error); // Muestra el error en la consola
    res.status(500).json({ error: "Error interno del servidor" }); // Responde con un error interno del servidor
  }
});

router.get('/login', (req,res) => {
  res.render('login')
})

router.get('/register', (req,res) => {
  res.render('register')
})

router.get('/profile', (req,res) => {
  if(!req.session.login){
      return res.redirect('/login')
  }
  res.render('profile')
})

export default router; // Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación
