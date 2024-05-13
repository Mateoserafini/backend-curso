// Importo el controlador de mensajes MongoDB
import MessageManager from "../dao/controllers/Mongo/messageManagerMongo.js";

// Creo una nueva instancia de MessageManager
const message = new MessageManager();

// Función para manejar la conexión de sockets
const socketChat = (socketServer) => {
  // Escucho el evento de conexión de un nuevo socket
  socketServer.on("connection", async (socket) => {
    console.log("Usuario conectado con ID: " + socket.id); // Muestra el ID del usuario conectado

    // Manejo el evento "mensaje" cuando se recibe un nuevo mensaje
    socket.on("mensaje", async (info) => {
      // Creo un nuevo mensaje en la base de datos
      await message.createMessage(info);
      // Emite el evento "chat" con todos los mensajes a todos los clientes
      socketServer.emit("chat", await message.getMessages());
    });

    // Manejo el evento "clearchat" cuando se quiere borrar el chat
    socket.on("clearchat", async () => {
      // Borro todos los mensajes de la base de datos
      await message.deleteAllMessages();
      // Actualizo a los clientes con los mensajes borrados
      socketServer.emit("chat", []);
    });

    // Manejo el evento "nuevousuario" cuando se conecta un nuevo usuario
    socket.on("nuevousuario", (usuario) => {
      // Emite un evento de difusión ("broadcast") con el nombre del usuario a los demás clientes
      socket.broadcast.emit("broadcast", usuario);
    });
  });
};

// Exporto la función para manejar la conexión de sockets
export default socketChat;
