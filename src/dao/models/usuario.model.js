import mongoose from "mongoose";

const schema = new mongoose.Schema({
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  role: {
    type: Boolean,
    default: false,
  },
});

const UsuarioModel = mongoose.model("usuario", schema);

export default UsuarioModel;
