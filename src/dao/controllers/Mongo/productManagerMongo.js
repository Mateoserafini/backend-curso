// Importo el modelo de productos desde el archivo correspondiente
import { productsModel } from "../../models/products.model.js";

// Defino la clase ProductManager para manejar operaciones relacionadas con productos
export default class ProductManager {
  // Método para obtener todos los productos
  getProducts = async (queryParams) => {
    try {
        const { limit = 10, page = 1, sort, query } = queryParams;
        const skip = (page - 1) * limit;

        // Construyo la consulta
        let filter = {};
        if (query) {
            // Permito filtrar por categoría o disponibilidad
            filter = { ...filter, $or: [{ category: query }, { availability: query }] };
        }

        // Configuro el sort si se proporciona
        let sortOption = {};
        if (sort === 'asc') {
            sortOption = { price: 1 };
        } else if (sort === 'desc') {
            sortOption = { price: -1 };
        }

        // Obtengo productos de la base de datos según los filtros, limit y sort especificados
        const products = await productsModel.find(filter).sort(sortOption).skip(skip).limit(limit);
        const totalProducts = await productsModel.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / limit);

        // Calculo las páginas previas y siguientes
        const hasPrevPage = page > 1;
        const hasNextPage = page < totalPages;
        const prevPage = hasPrevPage ? page - 1 : null;
        const nextPage = hasNextPage ? page + 1 : null;

        // Retorno un objeto con los datos requeridos
        return {
            status: "success",
            payload: products,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink: hasPrevPage ? `/api/products?page=${prevPage}&limit=${limit}` : null,
            nextLink: hasNextPage ? `/api/products?page=${nextPage}&limit=${limit}` : null,
        };
    } catch (error) {
        console.log("Error al obtener productos", error);
        // Lanza el error para ser manejado por quien llame a la función
        throw error;
    }
  };

  // Método para obtener todos los productos en formato lean (sin métodos de Mongoose)
  getProductsView = async () => {
    try {
      // Retorno todos los productos en formato lean
      return await productsModel.find().lean();
    } catch (error) {
      // Registro un error en la consola si ocurre durante la obtención de productos
      console.log("Error al obtener productos en formato lean", error);
      // Lanzo el error para ser manejado por quien llame a la función
      throw error;
    }
  };

  // Método para obtener un producto por ID
  async getProductById(id) {
    try {
      // Busco el producto por ID en la base de datos
      const producto = await productsModel.findById(id);
      if (!producto) {
        console.log("Producto no encontrado");
        return null;
      }
      console.log("Producto encontrado");
      return producto;
    } catch (error) {
      // Registro un error en la consola si ocurre durante la búsqueda del producto por ID
      console.log("Error al encontrar producto por ID", error);
      // Lanzo el error para ser manejado por quien llame a la función
      throw error;
    }
  }

  // Método para agregar un nuevo producto
  addProduct = async (product) => {
    try {
      // Creo un nuevo producto en la base de datos
      await productsModel.create(product);
      // Retorno el producto recién creado
      return await productsModel.findOne({ title: product.title });
    } catch (error) {
      // Registro un error en la consola si ocurre durante la creación del producto
      console.log("Error al crear un producto", error);
      // Lanzo el error para ser manejado por quien llame a la función
      throw error;
    }
  };

  // Método para actualizar un producto por ID
  async updateProduct(id, productoActualizado) {
    try {
      // Actualizo el producto por ID en la base de datos
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
      // Registro un error en la consola si ocurre durante la actualización del producto por ID
      console.log("Error al actualizar producto por ID", error);
      // Lanzo el error para ser manejado por quien llame a la función
      throw error;
    }
  }

  // Método para eliminar un producto por ID
  async deleteProduct(id) {
    try {
      // Elimino el producto por ID de la base de datos
      const deleteProduct = await productsModel.findByIdAndDelete(id);

      if (!deleteProduct) {
        console.log("Producto no encontrado");
        return null;
      }
      console.log("Producto eliminado");
    } catch (error) {
      // Registro un error en la consola si ocurre durante la eliminación del producto por ID
      console.log("Error al eliminar producto por ID", error);
      // Lanzo el error para ser manejado por quien llame a la función
      throw error;
    }
  }
}
