const { Schema, model } = require("mongoose");
// Definición del esquema de usuarios
const UsuariosSchema = new Schema({
  nombre: {
    type: String,
  },
  correo: { type: String },
  password: { type: String },
  img: { type: String },
  rol: { type: String, enum: ["ADMIN", "USER"] },
  estado: { type: Boolean, default: true },
});

const User = model("User", UsuariosSchema);

module.exports = User;
