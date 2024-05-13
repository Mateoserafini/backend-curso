// Importo la biblioteca mongoose para trabajar con la base de datos MongoDB
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Defino el esquema para los productos
const productSchema = new mongoose.Schema({
  // Título del producto
  title: {
    type: String,
    required: true, // Este campo es obligatorio
  },
  // Descripción del producto
  description: {
    type: String,
    required: true, // Este campo es obligatorio
  },
  // Precio del producto
  price: {
    type: Number,
    required: true, // Este campo es obligatorio
  },
  // Cantidad de stock del producto
  stock: {
    type: Number,
    required: true, // Este campo es obligatorio
  },
  // URL de la imagen en miniatura del producto
  thumbnail: {
    type: String,
    required: false, // Este campo no es obligatorio
  },
  // Código único del producto
  code: {
    type: String,
    unique: true, // El código debe ser único
    required: true, // Este campo es obligatorio
  },
  // Categoría del producto
  category: {
    type: String,
    required: true, // Este campo es obligatorio
  },
  // Estado del producto (disponible o no)
  status: {
    type: Boolean,
    default: true, // El valor predeterminado es true (disponible)
  },
});

// Aplico el plugin mongoosePaginate para la paginación
productSchema.plugin(mongoosePaginate);

// Creo y exporto el modelo de productos basado en el esquema definido
export const productsModel = mongoose.model("Product", productSchema);
