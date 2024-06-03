import { productsModel } from "../models/products.model.js";

export default class ProductController {
  getProducts = async (queryParams) => {
    try {
      const { limit = 10, page = 1, sort, query } = queryParams;
      const skip = (page - 1) * limit;

      let filter = {};
      if (query) {
        filter = {
          ...filter,
          $or: [{ category: query }, { availability: query }],
        };
      }

      let sortOption = {};
      if (sort === "asc") {
        sortOption = { price: 1 };
      } else if (sort === "desc") {
        sortOption = { price: -1 };
      }

      const products = await productsModel
        .find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit);
      const totalProducts = await productsModel.countDocuments(filter);
      const totalPages = Math.ceil(totalProducts / limit);

      const hasPrevPage = page > 1;
      const hasNextPage = page < totalPages;
      const prevPage = hasPrevPage ? page - 1 : null;
      const nextPage = hasNextPage ? page + 1 : null;

      return {
        status: "success",
        payload: products,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink: hasPrevPage
          ? `/api/products?page=${prevPage}&limit=${limit}`
          : null,
        nextLink: hasNextPage
          ? `/api/products?page=${nextPage}&limit=${limit}`
          : null,
      };
    } catch (error) {
      console.log("Error al obtener productos", error);
      throw error;
    }
  };

  getProductsView = async () => {
    try {
      return await productsModel.find().lean();
    } catch (error) {
      console.log("Error al obtener productos en formato lean", error);
      throw error;
    }
  };

  async getProductById(id) {
    try {
      const producto = await productsModel.findById(id);
      if (!producto) {
        console.log("Producto no encontrado");
        return null;
      }
      console.log("Producto encontrado");
      return producto;
    } catch (error) {
      console.log("Error al encontrar producto por ID", error);
      throw error;
    }
  }

  addProduct = async (product) => {
    try {
      await productsModel.create(product);
      return await productsModel.findOne({ title: product.title });
    } catch (error) {
      console.log("Error al crear un producto", error);
      throw error;
    }
  };

  async updateProduct(id, productoActualizado) {
    try {
      const updateProduct = await productsModel.findByIdAndUpdate(
        id,
        productoActualizado,
        { new: true } 
      );
      if (!updateProduct) {
        console.log("Producto no encontrado");
        return null;
      }
      console.log("Producto actualizado");
      return updateProduct;
    } catch (error) {
      console.log("Error al actualizar producto por ID", error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const deleteProduct = await productsModel.findByIdAndDelete(id);

      if (!deleteProduct) {
        console.log("Producto no encontrado");
        return null;
      }
      console.log("Producto eliminado");
    } catch (error) {
      console.log("Error al eliminar producto por ID", error);
      throw error;
    }
  }
}
