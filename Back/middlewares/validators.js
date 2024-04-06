const { validationResult } = require("express-validator");
const User = require("../models/user");

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errores: errors.array(),
    });
  }

  next();
};

const emailExiste = async (correo) => {
  const usuario = await User.findOne({ correo });
  if (usuario) {
    throw new Error("El correo electrónico ya esta registrado");
  }
};

const existeUsuarioPorId = async (id) => {
  const usuario = await User.findById(id);
  if (!usuario) {
    throw new Error("El usuario no existe");
  }
};

module.exports = { validarCampos, existeUsuarioPorId, emailExiste };
