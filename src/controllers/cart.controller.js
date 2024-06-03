import { cartModel } from "../models/cart.model.js";

class CartController {
  async createCart(req, res) {
    try {
      const nuevoCarrito = await cartModel.create({ products: [] });
      console.log("carrito enviado:", nuevoCarrito); 
      return nuevoCarrito; 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
  async getCartById(req, res) {
    const cartId = req.params.cid;
    try {
      const carrito = await cartModel.findById(cartId);
      if (!carrito) {
        return res.status(404).json({ error: "Carrito no encontrado" });
      }
      res.json(carrito.products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async addProductToCart(req, res) {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;

    try {
      const carrito = await cartModel.findById(cartId);
      if (!carrito) {
        return res.status(404).json({ error: "Carrito no encontrado" });
      }

      carrito.products.push({ product: productId, quantity });
      await carrito.save();

      res.json(carrito.products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async deleteProductFromCart(req, res) {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    try {
      const carrito = await cartModel.findById(cartId);
      if (!carrito) {
        return res.status(404).json({ error: "Carrito no encontrado" });
      }

      carrito.products = carrito.products.filter(product => product.product.toString() !== productId);
      await carrito.save();

      res.json(carrito.products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async updateCart(req, res) {
    const cartId = req.params.cid;
    const { products } = req.body;

    try {
      const carrito = await cartModel.findByIdAndUpdate(cartId, { products }, { new: true });
      if (!carrito) {
        return res.status(404).json({ error: "Carrito no encontrado" });
      }
      res.json(carrito.products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async updateProductQuantity(req, res) {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;

    try {
      const carrito = await cartModel.findById(cartId);
      if (!carrito) {
        return res.status(404).json({ error: "Carrito no encontrado" });
      }

      // Actualizar la cantidad del producto en el carrito
      const productToUpdate = carrito.products.find(product => product.product.toString() === productId);
      if (productToUpdate) {
        productToUpdate.quantity = quantity;
        await carrito.save();
      }

      res.json(carrito.products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async deleteAllProductsFromCart(req, res) {
    const cartId = req.params.cid;

    try {
      const carrito = await cartModel.findByIdAndUpdate(cartId, { products: [] }, { new: true });
      if (!carrito) {
        return res.status(404).json({ error: "Carrito no encontrado" });
      }
      res.json(carrito.products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

export default CartController;
