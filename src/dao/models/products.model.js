// Importa la biblioteca mongoose para trabajar con la base de datos MongoDB
import mongoose from "mongoose";

// Define el esquema para los productos
const productSchema = new mongoose.Schema({
  // Título del producto
  title: {
    type: String,
    required: true, // El campo es obligatorio
  },
  // Descripción del producto
  description: {
    type: String,
    required: true, // El campo es obligatorio
  },
  // Precio del producto
  price: {
    type: Number,
    required: true, // El campo es obligatorio
  },
  // Cantidad en stock del producto
  stock: {
    type: Number,
    required: true, // El campo es obligatorio
  },
  // URL de la imagen en miniatura del producto
  thumbnail: {
    type: String,
    required: false, // El campo no es obligatorio
  },
  // Código único del producto
  code: {
    type: String,
    unique: true, // El código debe ser único
    required: true, // El campo es obligatorio
  },
  // Categoría del producto
  category: {
    type: String,
    required: true, // El campo es obligatorio
  },
  // Estado del producto (disponible o no)
  status: {
    type: Boolean,
    default: true, // Valor por defecto es true (disponible)
  },
});

// Crea y exporta el modelo de productos basado en el esquema definido
export const productsModel = mongoose.model("products", productSchema);

