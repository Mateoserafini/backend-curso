// Importo el modelo de mensajes desde el archivo correspondiente
import messageModel from "../../models/messages.model.js";

// Defino la clase MessageManager para manejar operaciones relacionadas con mensajes
export default class MessageManager {
  // Método para obtener todos los mensajes
  getMessages = async () => {
    try {
      // Retorno todos los mensajes en formato lean (sin métodos de Mongoose)
      return await messageModel.find().lean();
    } catch (error) {
      // Registro un error en la consola si ocurre durante la obtención de mensajes
      console.log("Error al obtener mensajes", error);
      // Lanzo el error para ser manejado por quien llame a la función
      throw error;
    }
  };

  // Método para crear un nuevo mensaje
  createMessage = async (message) => {
    // Verifico que el usuario y el mensaje no estén vacíos
    if (message.user.trim() === "" || message.message.trim() === "") {
      return null;
    }
    try {
      // Creo un nuevo mensaje en la base de datos
      return await messageModel.create(message);
    } catch (error) {
      // Registro un error en la consola si ocurre durante la creación del mensaje
      console.log("Error al guardar mensaje", error);
      // Lanzo el error para ser manejado por quien llame a la función
      throw error;
    }
  };

  // Método para borrar todos los mensajes
  deleteAllMessages = async () => {
    try {
      // Registro un mensaje en la consola indicando que estoy borrando los mensajes
      console.log("Borrando mensajes...");
      // Borro todos los mensajes de la base de datos
      const result = await messageModel.deleteMany({});
      // Registro el resultado en la consola
      console.log("Mensajes borrados:", result);
      // Retorno el resultado
      return result;
    } catch (error) {
      // Registro un error en la consola si ocurre durante el borrado de mensajes
      console.error("Error al borrar mensajes:", error);
      // Retorno el error
      return error;
    }
  };
}
