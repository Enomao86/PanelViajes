const Viaje = require("../models/viajes");

const crearViaje = async (req, res) => {
  try {
    const { nombre, fecha } = req.body;
    const userId = req.session.userId;

    if (!nombre || !fecha) {
      return res.status(400).json({ error: "Nombre y fecha del viaje son requeridos" });
    }

    const nuevoViaje = new Viaje({ nombre, fecha, usuario: userId });
    await nuevoViaje.save();

    res.status(201).json(nuevoViaje);
  } catch (error) {
    console.error("Error al crear el viaje:", error);
    res.status(500).json({ error: "Error al crear el viaje" });
  }
};

const obtenerViajes = async (req, res) => {
  try {
    const userId = req.session.userId;
    const viajes = await Viaje.find({ usuario: userId, activo: true });
    res.status(200).json(viajes);
  } catch (error) {
    console.error("Error al obtener los viajes:", error);
    res.status(500).json({ error: "Error al obtener los viajes" });
  }
};

const eliminarViajeLogico = async (req, res) => {
  try {
    const { id } = req.params;
    const viajeEliminado = await Viaje.findByIdAndUpdate(id, { activo: false }, { new: true });

    if (!viajeEliminado) {
      return res.status(404).json({ error: "Viaje no encontrado" });
    }

    res.json({ mensaje: "Viaje eliminado exitosamente", viaje: viajeEliminado });
  } catch (error) {
    console.error("Error al eliminar el viaje:", error);
    res.status(500).json({ error: "Error al eliminar el viaje" });
  }
};

module.exports = { crearViaje, obtenerViajes, eliminarViajeLogico };