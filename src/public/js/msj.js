const socket = io();

let user;

// Inicialización del chat
const chatBox = document.getElementById('chatBox');
Swal.fire({
    title: "Identifícate",
    input: "text",
    text: "Ingresa un usuario para identificarte en el chat",
    inputValidator: (value) => {
        return !value && "Necesitas escribir un nombre para continuar";
    },
    allowOutsideClick: false,
}).then(result => {
    user = result.value;
});

chatBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            socket.emit("message", { user: user, message: chatBox.value });
            chatBox.value = "";
        }
    }
});

socket.on("message", data => {
    const log = document.getElementById("messagesLogs");
    let messages = "";

    data.forEach(message => {
        messages += `${message.user} dice: ${message.message} <br>`;
    });

    log.innerHTML = messages;
});

