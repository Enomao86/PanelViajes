const { Router } = require("express");
const viajeController = require("../controllers/viajeController");
const verificarToken = require("../middlewares/verificarToken");
const router = Router();

router.post("/", verificarToken, viajeController.crearViaje);
router.get("/user", verificarToken, viajeController.obtenerViajes);
router.delete("/:id", viajeController.eliminarViajeLogico);

module.exports = router;

