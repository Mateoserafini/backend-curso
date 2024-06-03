import { cartModel } from "../models/cart.model.js";

export default class CartController {
  constructor() {}

  async createCart() {
    try {
      const newCart = new cartModel({ products: [] });
      await newCart.save();
      return newCart;
    } catch (error) {
      console.error("Error al crear un nuevo carrito:", error);
      throw error;
    }
  }

  async getCartById(cartId) {
    try {
      const carrito = await cartModel
        .findById(cartId)
        .populate("products.product");

      if (!carrito) {
        console.log("El carrito con el ID especificado no existe.");
        return null;
      }

      return carrito;
    } catch (error) {
      console.error("Error al obtener el carrito por su ID:", error);
      throw error;
    }
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    try {
      const carrito = await this.getCartById(cartId);
      if (!carrito) {
        console.log("El carrito no existe.");
        return null;
      }

      const productInCart = carrito.products.find(
        (item) => item.product.toString() === productId
      );

      if (productInCart) {
        productInCart.quantity += quantity;
      } else {
        carrito.products.push({ product: productId, quantity });
      }

      await carrito.save();
      return carrito;
    } catch (error) {
      console.error("Error al agregar un producto al carrito:", error);
      throw error;
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const carrito = await this.getCartById(cartId);
      if (!carrito) {
        console.log("El carrito no existe.");
        return null;
      }

      carrito.products = carrito.products.filter(
        (producto) => producto.product._id.toString() !== productId
      );

      await carrito.save();
      return carrito;
    } catch (error) {
      console.error("Error al eliminar un producto del carrito:", error);
      throw error;
    }
  }

  async deleteAllProductsFromCart(cartId) {
    try {
      const carrito = await this.getCartById(cartId);
      carrito.products = [];
      await carrito.save();
      return carrito;
    } catch (error) {
      console.log("Error al eliminar todos los productos del carrito", error);
      throw error;
    }
  }

  async updateProductQuantity(cartId, productId, newQuantity) {
    try {
      const carrito = await this.getCartById(cartId);
      if (!carrito) {
        console.log("El carrito no existe.");
        return null;
      }

      const productInCart = carrito.products.find(
        (producto) => producto.product._id.toString() === productId
      );

      if (productInCart) {
        productInCart.quantity = newQuantity;
        await carrito.save();
        return carrito;
      } else {
        console.log("El producto no se encuentra en el carrito.");
        return null;
      }
    } catch (error) {
      console.error(
        "Error al actualizar la cantidad del producto en el carrito:",
        error
      );
      throw error;
    }
  }

  async clearCart(cartId) {
    try {
      const carrito = await this.getCartById(cartId);
      if (!carrito) {
        console.log("El carrito no existe.");
        return null;
      }

      carrito.products = [];
      await carrito.save();
      return carrito;
    } catch (error) {
      console.error("Error al vaciar el carrito:", error);
      throw error;
    }
  }

  async updateCart(cartId, productsArray) {
    try {
      const carrito = await this.getCartById(cartId);
      if (!carrito) {
        console.log("El carrito no existe.");
        return null;
      }

      carrito.products = productsArray;
      await carrito.save();
      return carrito;
    } catch (error) {
      console.error("Error al actualizar el carrito:", error);
      throw error;
    }
  }
}
