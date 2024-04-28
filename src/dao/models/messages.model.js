// Importa la biblioteca mongoose para trabajar con la base de datos MongoDB
import mongoose from "mongoose";

// Define el esquema para los mensajes
const messageSchema = new mongoose.Schema(
  {
    // Campo para el nombre del usuario que envió el mensaje
    user: {
        type: String,
        required: true, // El campo es obligatorio
        trim: true // Elimina los espacios en blanco iniciales y finales
    },
    // Campo para el contenido del mensaje
    message: {
        type: String,
        required: true, // El campo es obligatorio
        trim: true // Elimina los espacios en blanco iniciales y finales
    },
  },
  // Configuración adicional para agregar marcas de tiempo (createdAt y updatedAt)
  { timestamps: true }
);

// Crea y exporta el modelo de mensajes basado en el esquema definido
export default mongoose.model("messages", messageSchema);
