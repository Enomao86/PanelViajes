const jwt = require('jsonwebtoken');
const Usuario = require("../models/user");

const verificarToken = async (req, res, next) => {
  try {
    // Obtener el token de autenticación del encabezado 'Authorization'
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token de autenticación no proporcionado" });
    }

    const token = authHeader.split(' ')[1];

    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY); // Reemplaza 'your-secret-key' con tu clave secreta

    // Imprimir el token y el valor decodificado
    console.log('Token:', token);
    console.log('Decoded:', decoded);

    // Verificar si el usuario existe en la base de datos
    const usuario = await Usuario.findById(decoded.userId);

    if (!usuario) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    // Almacenar el ID del usuario en la sesión
    req.session.userId = decoded.userId;

    // Continuar con la siguiente middleware
    next();
  }catch (error) {
    console.error("Error al verificar el usuario:", error);
    return res.status(401).json({ error: error.message });
  }}

module.exports = verificarToken;