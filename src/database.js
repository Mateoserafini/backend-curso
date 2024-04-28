// Importa mongoose para trabajar con MongoDB
import mongoose from "mongoose";
// Importa las variables de entorno
import "dotenv/config";

// Conecta a la base de datos MongoDB utilizando la URI especificada en las variables de entorno
mongoose
  .connect(process.env.URI) // URI obtenida de las variables de entorno
  .then(() => console.log("Conectado a MongoDB")) // Si la conexión es exitosa, muestra un mensaje en la consola
  .catch((error) => console.log("Error de conexión a MongoDB", error)); // Si ocurre un error, muestra un mensaje de error en la consola
