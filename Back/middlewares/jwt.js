const jwt = require('jsonwebtoken');

const generarJWT = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = { userId };

    jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
      expiresIn: '24h'
    }, (err, token) => {
      if (err) {
        console.error('Error al generar el token:', err);
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = generarJWT;