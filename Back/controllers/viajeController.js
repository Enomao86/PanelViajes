const Viaje = require("../models/viajes"); // Importar el modelo de Viaje

const crearViaje = async (req, res) => {
  try {
    const { nombre, fecha } = req.body; // Obtener el nombre y fecha del cuerpo de la solicitud
    const nuevoViaje = new Viaje({
      nombre,
      fecha,
      usuario: req.userId, // Asignar el ID del usuario al campo 'usuario' del viaje
    });

    // Guardar el nuevo viaje en la base de datos
    await nuevoViaje.save();

    // Enviar una respuesta exitosa
    res
      .status(201)
      .json({ mensaje: "Viaje creado exitosamente", viaje: nuevoViaje });
  } catch (error) {
    // Si hay algún error, enviar una respuesta de error
    console.error("Error al crear el viaje:", error);
    res.status(500).json({ error: "Error al crear el viaje" });
  }
};

// Función para cargar los viajes desde el backend
const obtenerViajes = async (req, res) => {
  try {
    const viajes = await Viaje.find({ usuario: req.userId, activo: true });
    res.json(viajes);
  } catch (error) {
    console.error("Error al obtener los viajes:", error);
    res.status(500).json({ error: "Error al obtener los viajes" });
  }
};

const eliminarViajeLogico = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del viaje desde los parámetros de la ruta

    // Buscar el viaje en la base de datos y actualizar el campo 'activo' a false
    const viajeEliminado = await Viaje.findByIdAndUpdate(id, { activo: false }, { new: true });

    if (!viajeEliminado) {
      return res.status(404).json({ error: "Viaje no encontrado" });
    }

    // Enviar una respuesta exitosa
    res.json({ mensaje: "Viaje eliminado exitosamente", viaje: viajeEliminado });
  } catch (error) {
    // Si hay algún error, enviar una respuesta de error
    console.error("Error al eliminar el viaje:", error);
    res.status(500).json({ error: "Error al eliminar el viaje" });
  }
};

const agregarPasajero = async (req, res) => {
  try {
    const viajeId = req.params.id;
    const { nombre, dni, telefono } = req.body;

    const viaje = await Viaje.findById(viajeId);
    if (!viaje) {
      return res.status(404).json({ error: "Viaje no encontrado" });
    }

    const pasajero = { nombre, dni, telefono };
    viaje.pasajeros.push(pasajero);

    await viaje.save();

    res.status(201).json({ mensaje: "Pasajero agregado exitosamente", pasajero });
  } catch (error) {
    console.error("Error al agregar pasajero:", error);
    res.status(500).json({ error: "Error al agregar pasajero" });
  }
};

module.exports = { crearViaje, obtenerViajes, eliminarViajeLogico, agregarPasajero };






