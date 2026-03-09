import mongoose from "mongoose";
import configObject from "./config/config.js";


mongoose
  .connect(configObject.mongoURL)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.log("Error de conexión a MongoDB", error));
