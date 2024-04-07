const { Router } = require("express");

const { check } = require("express-validator");

const router = Router();

const { validarCampos } = require("../middlewares/validators");

const { login } = require("../controllers/auth");



router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);



module.exports = router;
