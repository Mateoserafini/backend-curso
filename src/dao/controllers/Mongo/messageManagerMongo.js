// Importa el modelo de mensajes desde el archivo correspondiente
import messageModel from "../../models/messages.model.js";

// Define la clase MessageManager para manejar operaciones relacionadas con mensajes
export default class MessageManager {
  // Método para obtener todos los mensajes
  getMessages = async () => {
    try {
      // Retorna todos los mensajes en formato lean (sin métodos de Mongoose)
      return await messageModel.find().lean();
    } catch (error) {
      // Registra un error en la consola si ocurre durante la obtención de mensajes
      console.log("Error al obtener mensajes", error);
      // Lanza el error para ser manejado por el que llame a la función
      throw error;
    }
  };

  // Método para crear un nuevo mensaje
  createMessage = async (message) => {
    // Verifica que el usuario y el mensaje no estén vacíos
    if (message.user.trim() === "" || message.message.trim() === "") {
      return null;
    }
    try {
      // Crea un nuevo mensaje en la base de datos
      return await messageModel.create(message);
    } catch (error) {
      // Registra un error en la consola si ocurre durante la creación del mensaje
      console.log("Error al guardar mensaje", error);
      // Lanza el error para ser manejado por el que llame a la función
      throw error;
    }
  };

  // Método para borrar todos los mensajes
  deleteAllMessages = async () => {
    try {
      // Registra un mensaje en la consola indicando que se están borrando los mensajes
      console.log("Borrando mensajes...");
      // Borra todos los mensajes de la base de datos
      const result = await messageModel.deleteMany({});
      // Registra el resultado en la consola
      console.log("Mensajes borrados:", result);
      // Retorna el resultado
      return result;
    } catch (error) {
      // Registra un error en la consola si ocurre durante el borrado de mensajes
      console.error("Error al borrar mensajes:", error);
      // Retorna el error
      return error;
    }
  };
}
