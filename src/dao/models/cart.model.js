// Importa la biblioteca mongoose para trabajar con la base de datos MongoDB
import mongoose from "mongoose";

// Define el esquema para los carritos de compra
const cartSchema = new mongoose.Schema({
  // El carrito contiene una lista de productos
  products: [
    {
      // Cada producto es un objeto que incluye el ID del producto (referencia al modelo Product)
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Referencia al modelo "Product"
        required: true, // El campo es obligatorio
      },
      // Cantidad de unidades de ese producto en el carrito
      quantity: {
        type: Number,
        required: true, // El campo es obligatorio
      },
    },
  ],
});

// Crea y exporta el modelo de carritos de compra basado en el esquema definido
export const cartModel = mongoose.model("carts", cartSchema);
