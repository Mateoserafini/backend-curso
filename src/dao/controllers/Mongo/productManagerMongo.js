// Importa el modelo de productos desde el archivo correspondiente
import { productsModel } from "../../models/products.model.js";

// Define la clase ProductManager para manejar operaciones relacionadas con productos
export default class ProductManager {
  // Método para obtener todos los productos
  getProducts = async () => {
    try {
      // Retorna todos los productos de la base de datos
      return await productsModel.find();
    } catch (error) {
      // Registra un error en la consola si ocurre durante la obtención de productos
      console.log("Error al obtener productos", error);
      // Lanza el error para ser manejado por el que llame a la función
      throw error;
    }
  };

  // Método para obtener todos los productos en formato lean (sin métodos de Mongoose)
  getProductsView = async () => {
    try {
      // Retorna todos los productos en formato lean
      return await productsModel.find().lean();
    } catch (error) {
      // Registra un error en la consola si ocurre durante la obtención de productos
      console.log("Error al obtener productos en formato lean", error);
      // Lanza el error para ser manejado por el que llame a la función
      throw error;
    }
  };

  // Método para obtener un producto por ID
  async getProductById(id) {
    try {
      // Busca el producto por ID en la base de datos
      const producto = await productsModel.findById(id);
      if (!producto) {
        console.log("Producto no encontrado");
        return null;
      }
      console.log("Producto encontrado");
      return producto;
    } catch (error) {
      // Registra un error en la consola si ocurre durante la búsqueda del producto por ID
      console.log("Error al encontrar producto por ID", error);
      // Lanza el error para ser manejado por el que llame a la función
      throw error;
    }
  }

  // Método para agregar un nuevo producto
  addProduct = async (product) => {
    try {
      // Crea un nuevo producto en la base de datos
      await productsModel.create(product);
      // Retorna el producto recién creado
      return await productsModel.findOne({ title: product.title });
    } catch (error) {
      // Registra un error en la consola si ocurre durante la creación del producto
      console.log("Error al crear un producto", error);
      // Lanza el error para ser manejado por el que llame a la función
      throw error;
    }
  };

  // Método para actualizar un producto por ID
  async updateProduct(id, productoActualizado) {
    try {
      // Actualiza el producto por ID en la base de datos
      const updateProduct = await productsModel.findByIdAndUpdate(
        id,
        productoActualizado,
        { new: true } // Para retornar el producto actualizado
      );
      if (!updateProduct) {
        console.log("Producto no encontrado");
        return null;
      }
      console.log("Producto actualizado");
      return updateProduct;
    } catch (error) {
      // Registra un error en la consola si ocurre durante la actualización del producto por ID
      console.log("Error al actualizar producto por ID", error);
      // Lanza el error para ser manejado por el que llame a la función
      throw error;
    }
  }

  // Método para eliminar un producto por ID
  async deleteProduct(id) {
    try {
      // Elimina el producto por ID de la base de datos
      const deleteProduct = await productsModel.findByIdAndDelete(id);

      if (!deleteProduct) {
        console.log("Producto no encontrado");
        return null;
      }
      console.log("Producto eliminado");
    } catch (error) {
      // Registra un error en la consola si ocurre durante la eliminación del producto por ID
      console.log("Error al eliminar producto por ID", error);
      // Lanza el error para ser manejado por el que llame a la función
      throw error;
    }
  }
}
