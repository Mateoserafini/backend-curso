// Importo la biblioteca mongoose para trabajar con la base de datos MongoDB
import mongoose from "mongoose";

// Defino el esquema para los mensajes
const messageSchema = new mongoose.Schema(
  {
    // Campo para el nombre del usuario que envió el mensaje
    user: {
      type: String,
      required: true, // Este campo es obligatorio
      trim: true, // Elimino los espacios en blanco iniciales y finales
    },
    // Campo para el contenido del mensaje
    message: {
      type: String,
      required: true, // Este campo es obligatorio
      trim: true, // Elimino los espacios en blanco iniciales y finales
    },
  },
  // Configuración adicional para agregar marcas de tiempo (createdAt y updatedAt)
  { timestamps: true }
);

// Creo y exporto el modelo de mensajes basado en el esquema definido
export default mongoose.model("messages", messageSchema);
