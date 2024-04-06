const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const generarJWT = require("../middlewares/jwt");

const login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const usuario = await User.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({
        msg: "El correo no es correcto",
      });
    }

    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario no autorizado",
      });
    }

    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "El password es incorrecto",
      });
    }

    //Generar JWT

    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  try {
    // Aquí puedes implementar la lógica para cerrar sesión, como por ejemplo:
    // - Invalidar el token actual
    // - Limpiar la sesión del usuario
    // - Redireccionar al usuario a la página de inicio de sesión

    // Por ejemplo, si estás utilizando JWT, podrías invalidar el token simplemente no haciendo nada con él,
    // ya que los tokens JWT son stateless, lo que significa que el servidor no almacena información sobre ellos
    // y los tokens no tienen una forma sencilla de ser invalidados. Simplemente asegúrate de que el cliente
    // elimine el token almacenado.

    res.json({ msg: "Sesión cerrada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al cerrar sesión" });
  }
};

module.exports = { login, logout };
