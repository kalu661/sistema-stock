const pool = require('../database/db');
const jwt = require('jsonwebtoken');
const jwtHelper = require('../helpers/jwt');
const { SecurityKEY } = require('../../config/config');

const secretKey = SecurityKEY;

//* OBTENER TODOS LOS USUARIOS

const getAllUsers = async (req, res, next) => {
  try {
    const allUser = await pool.query('SELECT * FROM users_admin');
    res.json(allUser.rows);
  } catch (error) {
    next(error);
  }
};

//* Ruta de login

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  //* Verificar las credenciales en la base de datos
  pool.query(
    'SELECT * FROM users_admin WHERE username = $1 AND password = $2',
    [username, password],
    (error, results) => {
      if (error) {
        console.error('Error al autenticar:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
      } else {
        if (results.rows.length > 0) {
          //* Credenciales válidas, el usuario está autenticado
          const user = results.rows[0];

          //* Generar el token con la información del usuario que desees incluir
          const payload = { userId: user.id, username: user.username };
          const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

          res.json({ message: 'Autenticación exitosa', token });
        } else {
          //* Credenciales inválidas, el usuario no está autenticado
          res.status(401).json({ message: 'Credenciales inválidas' });
        }
      }
    }
  );
};
//* CREAR UN USUARIO

const postUser = async (req, res, next) => {
  try {
    const { id_users, username, password } = req.body;
    const result = await pool.query('SELECT MAX(id_users) FROM users_admin');
    const lastId = result.rows[0].max || 0;
    const inserQuery =
      'INSERT INTO users_admin (id_users, username, password ) VALUES ($1, $2, $3)';
    const values = [lastId + 1, username, password];
    await pool.query(inserQuery, values);
    res
      .status(201)
      .json({ message: 'Registro de Usuaeio creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el registro de Usuario', error);
    res.status(500).json({ error: 'Error al crear el registro de Usuarios' });
  }
};

//* OBTENER UN USUARIO
const getUser = async (req, res, next) => {
  try {
    const { id_users } = req.params;
    const result = await pool.query(
      'SELECT * FROM users_admin WHERE id_users = $1',
      [id_users]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Usuario no encontrado' });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//* ACTUALIZAR EL USUARIO

const putUser = async (req, res, next) => {
  try {
    const stockId = req.params.id_users;
    const { username, password } = req.body;
    //* Actualizar el registro de Usuario en la tabla
    const updateQuery =
      'UPDATE users_admin SET username = $1, password = $2 WHERE id_users = $3';
    const values = [username, password, stockId];
    await pool.query(updateQuery, values);
    res
      .status(200)
      .json({ message: 'Registro de Usuario actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el registro de Usuario:', error);
    res
      .status(500)
      .json({ error: 'Error al actualizar el registro de Usuario' });
  }
};

//* ELIMINAR USUARIO

const deleteUser = async (req, res, next) => {
  try {
    const { id_users } = req.params;
    const result = await pool.query(
      'DELETE FROM users_admin WHERE id_users = $1',
      [id_users]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  postUser,
  getUser,
  putUser,
  deleteUser,
  loginUser,
};
