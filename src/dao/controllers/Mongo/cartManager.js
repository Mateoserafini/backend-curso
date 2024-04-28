// Importa el modelo de carrito desde el archivo correspondiente
import { cartModel } from "../../models/cart.model.js";


// Clase que gestiona los carritos de compra
export default class CartManager {
  // Constructor vacío
  constructor() {}

  // Método para agregar un nuevo carrito de compra
  async addCart() {
    try {
      // Crea un nuevo carrito con una lista vacía de productos
      const newCart = new cartModel({ products: [] });
      // Guarda el nuevo carrito en la base de datos
      await newCart.save();
      // Retorna el nuevo carrito
      return newCart;
    } catch (error) {
      // Registra un error en la consola si ocurre durante la creación del carrito
      console.log("Error al crear un carrito", error);
      // Lanza el error para ser manejado por el que llame a la función
      throw error;
    }
  }


  // Método para obtener un carrito por su ID y poblar los productos asociados
  async getCartById(cartId) {
    try {
        // Busca el carrito por su ID y utiliza populate para poblar los productos asociados
        const carrito = await cartModel.findById(cartId).populate('products.product');
        
        // Verifica si el carrito existe
        if (!carrito) {
            console.log("El carrito no existe");
            return null;
        }
        
        // Retorna el carrito con los productos poblados si se encontró
        return carrito;
    } catch (error) {
        // Registra un error en la consola si ocurre durante la búsqueda del carrito
        console.log("Error al obtener un carrito por su ID", error);
        // Lanza el error para ser manejado por el que llame a la función
        throw error;
    }
  }

  // Método para agregar un producto a un carrito de compra
  async addProductToCart(cartId, productId, quantity = 1) {
    try {
      // Obtiene el carrito por su ID
      const carrito = await this.getCartById(cartId);
      // Verifica si el producto ya existe en el carrito
      const existeProducto = carrito.products.find(
        (item) => item.product.toString() === productId
      );

      // Si el producto ya existe, incrementa su cantidad
      if (existeProducto) {
        existeProducto.quantity += quantity;
      } else {
        // Si el producto no existe, lo agrega al carrito con la cantidad especificada
        carrito.products.push({ product: productId, quantity });
      }

      // Marca los productos como modificados
      carrito.markModified("products");

      // Guarda el carrito actualizado en la base de datos
      await carrito.save();
      // Retorna el carrito actualizado
      return carrito;
    } catch (error) {
      // Registra un error en la consola si ocurre durante la operación
      console.log("Error al agregar un producto al carrito", error);
      // Lanza el error para ser manejado por el que llame a la función
      throw error;
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
        const carrito = await this.getCartById(cartId);
        // Filtra los productos para eliminar el producto con el ID especificado
        carrito.products = carrito.products.filter(
            (item) => item.product.toString() !== productId
        );
        // Guarda el carrito actualizado en la base de datos
        await carrito.save();
        return carrito;
    } catch (error) {
        console.log("Error al eliminar un producto del carrito", error);
        throw error;
    }
  }

  async updateCart(cartId, productsArray) {
    try {
        const carrito = await this.getCartById(cartId);
        // Reemplaza los productos actuales con el nuevo arreglo de productos
        carrito.products = productsArray;
        // Guarda el carrito actualizado en la base de datos
        await carrito.save();
        return carrito;
    } catch (error) {
        console.log("Error al actualizar el carrito", error);
        throw error;
    }
  }

  async updateProductQuantity(cartId, productId, newQuantity) {
    try {
        const carrito = await this.getCartById(cartId);
        // Encuentra el producto específico
        const productInCart = carrito.products.find(
            (item) => item.product.toString() === productId
        );
        // Si el producto se encuentra, actualiza la cantidad
        if (productInCart) {
            productInCart.quantity = newQuantity;
            await carrito.save();
            return carrito;
        } else {
            console.log("El producto no se encuentra en el carrito");
            return null;
        }
    } catch (error) {
        console.log("Error al actualizar la cantidad del producto en el carrito", error);
        throw error;
    }
  }

  async deleteAllProductsFromCart(cartId) {
    try {
        const carrito = await this.getCartById(cartId);
        // Vacía la lista de productos
        carrito.products = [];
        // Guarda el carrito actualizado en la base de datos
        await carrito.save();
        return carrito;
    } catch (error) {
        console.log("Error al eliminar todos los productos del carrito", error);
        throw error;
    }
  }
}

