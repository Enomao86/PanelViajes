const { Schema, model } = require("mongoose");


const ViajeSchema = new Schema({
  nombre: {
    type: String,
    required: true, // Indica que el campo es obligatorio
  },
  fecha: {
    type: Date,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario", // Referencia al modelo de Usuario
  },
});

const ViajeModel = model("Viaje", ViajeSchema); // Corregir el nombre del modelo

module.exports = ViajeModel;
