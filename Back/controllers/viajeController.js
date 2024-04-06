const Viaje = require("../models/viajes");

// Controlador para crear un nuevo viaje
exports.createViaje = async (req, res) => {
  try {
    const nuevoViaje = new Viaje(req.body);
    await nuevoViaje.save();
    res.status(201).json(nuevoViaje);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener todos los viajes
exports.getAllViajes = async (req, res) => {
  try {
    const viajes = await Viaje.find();
    res.status(200).json(viajes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Otros controladores para actualizar, eliminar, obtener un viaje por ID, etc.
exports.deleteViaje = async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar si el viaje existe
    const viaje = await Viaje.findById(id);
    if (!viaje) {
      return res.status(404).json({ message: "El viaje no existe" });
    }

    // Realizar el borrado lógico actualizando el estado
    await Viaje.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({ message: "Viaje eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
