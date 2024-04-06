const { Router } = require("express");
const viajeController = require("../controllers/viajeController");

const router = Router();

// Ruta para crear un nuevo viaje
router.post("/", viajeController.createViaje);

// Ruta para obtener todos los viajes
router.get("/", viajeController.getAllViajes);

// Otras rutas para actualizar, eliminar, obtener por ID, etc.

router.delete("/:id", viajeController.deleteViaje);

module.exports = router;
