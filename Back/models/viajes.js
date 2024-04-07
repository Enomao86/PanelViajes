const { mongoose,Schema, model } = require("mongoose");
const ViajeSchema = new Schema({

  
  nombre: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Esto debe coincidir con el nombre del modelo de usuario
   
  },
  activo: {
    type: Boolean,
    default: true,
  },
});

const Viaje = model("Viaje", ViajeSchema);

module.exports = Viaje;
