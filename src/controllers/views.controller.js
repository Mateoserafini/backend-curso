import ProductController from "../controllers/product.controller.js";
import { productsModel } from "../models/products.model.js";
import { cartModel } from "../models/cart.model.js";
const productController = new ProductController();

class ViewsController {
  constructor() {
  }

  async home(req, res) {
    try {
      if (!req.session.login) {
        return res.redirect("/login");
      }
      const user = req.session.user.first_name;
      const listadeproductos = await productController.getProductsView();
      res.render("home", { listadeproductos, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  realtimeproducts(req, res) {
    try {
      if (!req.session.login) {
        return res.redirect("/login");
      }
      res.render("realtimeproducts");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  chat(req, res) {
    try {
      if (!req.session.login) {
        return res.redirect("/login");
      }
      res.render("chat");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async products(req, res) {
    try {
      if (!req.session.login) {
        return res.redirect("/login");
      }
      let { page = 1, limit = 10 } = req.query;
      page = parseInt(page, 10);
      limit = parseInt(limit, 10);
      const options = {
        page: page,
        limit: limit,
        lean: true,
        leanWithId: false,
      };
      const result = await productsModel.paginate({}, options);
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
  }

  async cart(req, res) {
    try {
      if (!req.session.login) {
        return res.redirect("/login");
      }
      const cartId = req.params.cid;
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
  }

  login(req, res) {
    res.render("login");
  }

  register(req, res) {
    res.render("register");
  }

  profile(req, res) {
    try {
      if (!req.session.login) {
        return res.redirect("/login");
      }
      res.render("profile");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

export default ViewsController;