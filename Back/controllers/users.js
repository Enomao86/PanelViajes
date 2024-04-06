const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const usuariosGet = async (req, res) => {
  const { limite = 2, desde = 0 } = req.query;

  const filter = { estado: true };

  const [total, usuarios] = await Promise.all([
    User.countDocuments(filter),
    User.find(filter).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({ msg: "Estos son los usuarios de la DB", total, usuarios });
};

const usuariosPost = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;

  const newUser = new User({ nombre, correo, password, rol });

  const salt = bcryptjs.genSaltSync();

  newUser.password = bcryptjs.hashSync(password, salt);

  await newUser.save();

  res.json({ msg: "Usuario agregado correctamente", newUser });
};

const usuariosPut = async (req, res) => {
  const { id } = req.params;

  const { password, nombre, ...resto } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await User.findByIdAndUpdate(id, { $set: { resto, nombre } });

  res.json({ msg: "Usuario actualizado con exito", usuario });
};

const usuariosDelete = async (req, res) => {
  const { id } = req.params;

  //  Borrado fisico await User.findByIdAndDelete(id)

  //Borrado logico
  const usuario=await User.findByIdAndUpdate(id, { estado: false });

  res.json({ msg: "Solicitud de tipo DELETE" });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
