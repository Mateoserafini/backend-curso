// Importo la biblioteca mongoose para trabajar con la base de datos MongoDB
import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

// Defino el esquema para los carritos de compra
const cartSchema = new mongoose.Schema({
    // Lista de productos en el carrito
    products: [
        {
            // Referencia al modelo Product
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product", // Asegúrate de que "Product" coincida con el nombre del modelo de productos
                required: true, // Campo obligatorio
            },
            // Cantidad de ese producto en el carrito
            quantity: {
                type: Number,
                required: true, // Campo obligatorio
            },
        },
    ],
});

// Aplico el plugin mongoosePaginate para la paginación
cartSchema.plugin(mongoosePaginate);

// Creo y exporto el modelo de carritos basado en el esquema definido
export const cartModel = mongoose.model("Cart", cartSchema);
