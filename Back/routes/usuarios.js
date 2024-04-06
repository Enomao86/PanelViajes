const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

const {
  validarCampos,
  emailExiste,
  existeUsuarioPorId,
} = require("../middlewares/validators");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/users");

router.get("/", usuariosGet);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El nombre debe tener más de 6 caracteres").isLength({
      min: 6,
    }),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(emailExiste),
    validarCampos,
  ],
  usuariosPost
);

router.put("/", usuariosPut);

router.delete(
  "/",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
