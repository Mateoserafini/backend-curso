// Importo los modelos de carrito y productos
import { cartModel } from "../../models/cart.model.js";

// Clase que gestiona los carritos de compra
export default class CartManager {
  // Constructor vacío
  constructor() {}

  // Método para crear un nuevo carrito de compra
  async createCart() {
    try {
      // Creo un nuevo carrito con una lista vacía de productos
      const newCart = new cartModel({ products: [] });
      // Guardo el nuevo carrito en la base de datos
      await newCart.save();
      // Retorno el nuevo carrito creado
      return newCart;
    } catch (error) {
      console.error("Error al crear un nuevo carrito:", error);
      throw error;
    }
  }

  // Método para obtener un carrito por su ID
  async getCartById(cartId) {
    try {
      // Busco el carrito por su ID y utilizo populate para poblar los productos asociados
      const carrito = await cartModel
        .findById(cartId)
        .populate("products.product");

      // Verifico si el carrito existe
      if (!carrito) {
        console.log("El carrito con el ID especificado no existe.");
        return null;
      }

      // Retorno el carrito con los productos poblados
      return carrito;
    } catch (error) {
      console.error("Error al obtener el carrito por su ID:", error);
      throw error;
    }
  }

  // Método para agregar un producto a un carrito
  async addProductToCart(cartId, productId, quantity = 1) {
    try {
      // Obtengo el carrito por su ID
      const carrito = await this.getCartById(cartId);
      if (!carrito) {
        console.log("El carrito no existe.");
        return null;
      }

      // Verifico si el producto ya existe en el carrito
      const productInCart = carrito.products.find(
        (item) => item.product.toString() === productId
      );

      // Si el producto ya existe en el carrito, actualizo la cantidad
      if (productInCart) {
        productInCart.quantity += quantity;
      } else {
        // Si el producto no existe en el carrito, lo agrego con la cantidad especificada
        carrito.products.push({ product: productId, quantity });
      }

      // Guardo el carrito actualizado
      await carrito.save();
      return carrito;
    } catch (error) {
      console.error("Error al agregar un producto al carrito:", error);
      throw error;
    }
  }

  // Método para eliminar un producto de un carrito
  async deleteProductFromCart(cartId, productId) {
    try {
      // Obtengo el carrito por su ID
      const carrito = await this.getCartById(cartId);
      if (!carrito) {
        console.log("El carrito no existe.");
        return null;
      }

      // Elimino el producto especificado filtrando la lista de productos
      carrito.products = carrito.products.filter(
        (producto) => producto.product._id.toString() !== productId
      );

      // Guardo el carrito actualizado
      await carrito.save();
      return carrito;
    } catch (error) {
      console.error("Error al eliminar un producto del carrito:", error);
      throw error;
    }
  }

  // Método para eliminar todos los productos de un carrito
  async deleteAllProductsFromCart(cartId) {
    try {
      // Obtengo el carrito por su ID
      const carrito = await this.getCartById(cartId);
      // Vacío la lista de productos
      carrito.products = [];
      // Guardo el carrito actualizado en la base de datos
      await carrito.save();
      return carrito;
    } catch (error) {
      console.log("Error al eliminar todos los productos del carrito", error);
      throw error;
    }
  }

  // Método para actualizar la cantidad de un producto en el carrito
  async updateProductQuantity(cartId, productId, newQuantity) {
    try {
      // Obtengo el carrito por su ID
      const carrito = await this.getCartById(cartId);
      if (!carrito) {
        console.log("El carrito no existe.");
        return null;
      }

      // Encuentro el producto específico en el carrito
      const productInCart = carrito.products.find(
        (producto) => producto.product._id.toString() === productId
      );

      // Si el producto se encuentra, actualizo la cantidad
      if (productInCart) {
        productInCart.quantity = newQuantity;
        // Guardo el carrito actualizado
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

  // Método para vaciar todos los productos de un carrito
  async clearCart(cartId) {
    try {
      // Obtengo el carrito por su ID
      const carrito = await this.getCartById(cartId);
      if (!carrito) {
        console.log("El carrito no existe.");
        return null;
      }

      // Vacío la lista de productos en el carrito
      carrito.products = [];
      // Guardo el carrito actualizado
      await carrito.save();
      return carrito;
    } catch (error) {
      console.error("Error al vaciar el carrito:", error);
      throw error;
    }
  }

  // Método para actualizar un carrito completo con un nuevo arreglo de productos
  async updateCart(cartId, productsArray) {
    try {
      // Obtengo el carrito por su ID
      const carrito = await this.getCartById(cartId);
      if (!carrito) {
        console.log("El carrito no existe.");
        return null;
      }

      // Reemplazo los productos actuales con el nuevo arreglo de productos
      carrito.products = productsArray;
      // Guardo el carrito actualizado
      await carrito.save();
      return carrito;
    } catch (error) {
      console.error("Error al actualizar el carrito:", error);
      throw error;
    }
  }
}
