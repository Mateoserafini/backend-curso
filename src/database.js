import mongoose from "mongoose";
import "dotenv/config";

mongoose
  .connect(process.env.URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.log("Error de conexión a MongoDB", error));
