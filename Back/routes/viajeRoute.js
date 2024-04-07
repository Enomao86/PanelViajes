const { Router } = require("express");
const Viaje = require('../models/viajes'); // Asegúrate de que la ruta sea correcta
const viajeController = require("../controllers/viajeController");
const verificarToken = require("../middlewares/verificarToken");
const { check } = require("express-validator");
const router = Router();



router.post("/", verificarToken, async(req,res)=>{
try {
    // Obtener los datos del viaje desde el cuerpo de la solicitud
    const { nombre, fecha } = req.body;

    // Obtener el ID del usuario desde la sesión
    const userId = req.session.userId;

    // Verificar si se proporciona el nombre y la fecha del viaje
    if (!nombre || !fecha) {
      return res.status(400).json({ error: "Nombre y fecha del viaje son requeridos" });
    }

    // Crear un nuevo viaje asociado al ID del usuario
    const nuevoViaje = new Viaje({ nombre, fecha, usuario: userId, });

    // Guardar el nuevo viaje en la base de datos
    await nuevoViaje.save();

    res.status(201).json(nuevoViaje); // Devolver el nuevo viaje creado en la respuesta
  } catch (error) {
    console.error("Error al crear el viaje:", error);
    res.status(500).json({ error: "Error al crear el viaje" });
  }
});
router.get("/user", verificarToken, async (req, res) => {
  try {
    // Obtener el ID del usuario desde la sesión
    const userId = req.session.userId;

    // Buscar todos los viajes activos asociados a este usuario
    const viajes = await Viaje.find({ usuario: userId, activo: true });

    // Devolver los viajes encontrados en la respuesta
    res.status(200).json(viajes);
  } catch (error) {
    console.error("Error al obtener los viajes:", error);
    res.status(500).json({ error: "Error al obtener los viajes" });
  }
});

router.delete("/:id", viajeController.eliminarViajeLogico);



module.exports = router;