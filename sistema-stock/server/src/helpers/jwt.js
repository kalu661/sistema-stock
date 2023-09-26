const jwt = require('jsonwebtoken');
const { SecurityKEY } = require('../../config/config');

const secretKey = SecurityKEY;

module.exports = {
  // Función para crear un nuevo token
  generateToken: (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
  },

  // Función para verificar un token y obtener el contenido decodificado
  verifyToken: (token) => {
    try {
      return jwt.verify(token, secretKey);
    } catch (error) {
      return null; // Si el token no es válido o ha expirado, retornamos null
    }
  },
};
