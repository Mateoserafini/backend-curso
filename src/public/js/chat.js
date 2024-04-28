const socketClient = io(); // Establece una conexión con el servidor mediante Socket.io
const nombreUsuario = document.getElementById("nombreusuario"); // Obtiene el elemento para mostrar el nombre del usuario
const formulario = document.getElementById("formulario"); // Obtiene el formulario de mensajes
const inputmensaje = document.getElementById("mensaje"); // Obtiene el campo de entrada de mensajes
const chat = document.getElementById("chat"); // Obtiene el elemento del chat

let usuario = null; // Variable para almacenar el nombre del usuario

// Si el usuario no está definido, muestra un cuadro de diálogo para ingresar su nombre
if (!usuario) {
  Swal.fire({
    title: "Bienvenido al chat de la comunidad skater",
    text: "Ingresa tu usuario",
    input: "text",
    inputValidator: (value) => {
      if (!value) {
        return "Necesitas ingresar tu usuario o alias";
      }
    },
  }).then((username) => {
    usuario = username.value; // Guarda el nombre del usuario ingresado
    nombreUsuario.innerHTML = usuario; // Muestra el nombre del usuario en el elemento correspondiente
    socketClient.emit("nuevousuario", usuario); // Envía un evento al servidor con el nuevo usuario
  });
}

// Función para desplazar automáticamente la vista del chat hacia abajo
function scrollToBottom() {
  const chatContainer = document.getElementById("chat-messages"); // Obtiene el contenedor de mensajes del chat
  chatContainer.scrollTop = chatContainer.scrollHeight; // Desplaza hacia abajo
}

// Maneja el envío del formulario de mensajes
formulario.onsubmit = (e) => {
  e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
  const info = {
    user: usuario, // Nombre del usuario que envía el mensaje
    message: inputmensaje.value, // Mensaje ingresado
  };
  console.log(info); // Muestra la información en la consola
  socketClient.emit("mensaje", info); // Envía el mensaje al servidor
  inputmensaje.value = ""; // Limpia el campo de entrada de mensajes
  scrollToBottom(); // Desplaza automáticamente hacia abajo
};

// Maneja los mensajes recibidos del servidor
socketClient.on("chat", (mensajes) => {
  // Renderiza los mensajes en el chat
  const chatRender = mensajes
    .map((mensaje) => {
      const fechaCreacion = new Date(mensaje.createdAt); // Obtiene la fecha de creación del mensaje
      const opcionesHora = { hour: "2-digit", minute: "2-digit" }; // Opciones de formato de hora
      const horaFormateada = fechaCreacion.toLocaleTimeString(undefined, opcionesHora); // Formatea la hora
      return `<p"><strong>${horaFormateada}</strong> - <strong>${mensaje.user}</strong>: ${mensaje.message}</p>`; // Formatea el mensaje para el chat
    })
    .join(""); // Une los mensajes formateados en una cadena
  chat.innerHTML = chatRender; // Actualiza el contenido del chat
});

// Maneja el evento de ingreso de un nuevo usuario al chat
socketClient.on("broadcast", (usuario) => {
  Toastify({
    text: `Ingreso ${usuario} al chat`, // Mensaje de ingreso de usuario
    duration: 5000, // Duración de la notificación en milisegundos
    position: "right", // Posición de la notificación
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)", // Estilo de fondo de la notificación
    },
  }).showToast(); // Muestra la notificación
});

// Maneja el evento de limpiar el chat
document.getElementById("clearChat").addEventListener("click", () => {
  document.getElementById("chat").textContent = ""; // Limpia el contenido del chat
  socketClient.emit("clearchat"); // Envía un evento para limpiar el chat
});
