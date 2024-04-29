// Importa los modelos de carrito y productos
import { cartModel } from "../../models/cart.model.js";

// Clase que gestiona los carritos de compra
export default class CartManager {
    // Constructor vacío
    constructor() {}

    // Método para crear un nuevo carrito de compra
    async createCart() {
        try {
            // Crea un nuevo carrito con una lista vacía de productos
            const newCart = new cartModel({ products: [] });
            // Guarda el nuevo carrito en la base de datos
            await newCart.save();
            // Retorna el nuevo carrito creado
            return newCart;
        } catch (error) {
            console.error("Error al crear un nuevo carrito:", error);
            throw error;
        }
    }

    // Método para obtener un carrito por su ID
    async getCartById(cartId) {
        try {
            // Busca el carrito por su ID y utiliza populate para poblar los productos asociados
            const carrito = await cartModel.findById(cartId).populate('products.product');

            // Verifica si el carrito existe
            if (!carrito) {
                console.log("El carrito con el ID especificado no existe.");
                return null;
            }

            // Retorna el carrito con los productos poblados
            return carrito;
        } catch (error) {
            console.error("Error al obtener el carrito por su ID:", error);
            throw error;
        }
    }

    // Método para agregar un producto a un carrito
    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            // Obtiene el carrito por su ID
            const carrito = await this.getCartById(cartId);
            if (!carrito) {
                console.log("El carrito no existe.");
                return null;
            }

            // Verifica si el producto ya existe en el carrito
            const productInCart = carrito.products.find(
                (item) => item.product.toString() === productId
            );

            // Si el producto ya existe en el carrito, actualiza la cantidad
            if (productInCart) {
                productInCart.quantity += quantity;
            } else {
                // Si el producto no existe en el carrito, lo agrega con la cantidad especificada
                carrito.products.push({ product: productId, quantity });
            }

            // Guarda el carrito actualizado
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
            // Obtiene el carrito por su ID
            const carrito = await this.getCartById(cartId);
            if (!carrito) {
                console.log("El carrito no existe.");
                return null;
            }
    
            // Filtra los productos para eliminar el producto especificado
            carrito.products = carrito.products.filter(producto => producto.product._id.toString() !== productId);
    
            // Guarda el carrito actualizado
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

    // Método para actualizar la cantidad de un producto en el carrito
    async updateProductQuantity(cartId, productId, newQuantity) {
        try {
            // Obtiene el carrito por su ID
            const carrito = await this.getCartById(cartId);
            if (!carrito) {
                console.log("El carrito no existe.");
                return null;
            }

            // Encuentra el producto específico en el carrito
            const productInCart = carrito.products.find(
                (producto) => producto.product._id.toString() === productId
            );

            // Si el producto se encuentra, actualiza la cantidad
            if (productInCart) {
                productInCart.quantity = newQuantity;
                // Guarda el carrito actualizado
                await carrito.save();
                return carrito;
            } else {
                console.log("El producto no se encuentra en el carrito.");
                return null;
            }
        } catch (error) {
            console.error("Error al actualizar la cantidad del producto en el carrito:", error);
            throw error;
        }
    }

    // Método para vaciar todos los productos de un carrito
    async clearCart(cartId) {
        try {
            // Obtiene el carrito por su ID
            const carrito = await this.getCartById(cartId);
            if (!carrito) {
                console.log("El carrito no existe.");
                return null;
            }

            // Vacía la lista de productos en el carrito
            carrito.products = [];
            // Guarda el carrito actualizado
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
            // Obtiene el carrito por su ID
            const carrito = await this.getCartById(cartId);
            if (!carrito) {
                console.log("El carrito no existe.");
                return null;
            }

            // Reemplaza los productos actuales con el nuevo arreglo de productos
            carrito.products = productsArray;
            // Guarda el carrito actualizado
            await carrito.save();
            return carrito;
        } catch (error) {
            console.error("Error al actualizar el carrito:", error);
            throw error;
        }
    }
}
