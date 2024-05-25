import { Router } from "express";
import ProductManager from "../dao/controllers/Mongo/productManagerMongo.js";
import { __dirname } from "../utils.js";
import { productsModel } from "../dao/models/products.model.js";
import { cartModel } from "../dao/models/cart.model.js";

const prodM = new ProductManager();
const router = Router();

router.get("/", async (req, res) => {
  if (!req.session.login) {
    return res.redirect("/login");
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

router.get("/realtimeproducts", (req, res) => {
  if (!req.session.login) {
    return res.redirect("/login");
  }
  try {
    res.render("realtimeproducts");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/chat", (req, res) => {
  if (!req.session.login) {
    return res.redirect("/login");
  }

  try {
    res.render("chat");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/products", async (req, res) => {
  if (!req.session.login) {
    return res.redirect("/login");
  }

  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  try {
    const options = {
      page: page,
      limit: limit,
      lean: true,
      leanWithId: false,
    };

    const result = await productsModel.paginate({}, options);
    console.log(result);

    res.render("products", {
      user: req.session.user.first_name,
      products: result.docs,
      page: result.page,
      totalPages: result.totalPages,
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      limit: result.limit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/carts/:cid", async (req, res) => {
  if (!req.session.login) {
    return res.redirect("/login");
  }

  const cartId = req.params.cid;

  try {
    const cart = await cartModel.findById(cartId).populate("products.product");

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const productsWithSubtotals = cart.products.map((item) => {
      return {
        ...item.toObject(),
        subtotal: item.quantity * item.product.price,
      };
    });

    res.render("carts", { products: productsWithSubtotals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/profile", (req, res) => {
  if (!req.session.login) {
    return res.redirect("/login");
  }
  res.render("profile");
});

export default router;
