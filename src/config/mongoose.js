import mongoose from "mongoose"

const connectionString = 'mongodb+srv://matuserafini:45089673@cluster0.frnygq1.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0';


mongoose.connect(connectionString)
    .then(() => console.log("Conexion exitosa"))
    .catch((error) => console.log("Error en la conexion", error))