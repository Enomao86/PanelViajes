const mongoose = require('mongoose');
const PasajeroSchema = require('./pasajero'); // Asegúrate de que la ruta sea correcta

const ViajeSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  activo: {
    type: Boolean,
    default: true
  },
  pasajeros: [PasajeroSchema]
});

module.exports = mongoose.model('Viaje', ViajeSchema);