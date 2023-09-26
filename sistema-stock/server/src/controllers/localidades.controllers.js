const pool = require('../database/db');

//* OBTENER LAS LOCALIDADES

const getAllLocalidad = async (req, res, next) => {
  try {
    const allStock = await pool.query('SELECT * FROM localidades');
    res.json(allStock.rows);
  } catch (error) {
    next(error);
  }
};

//* CREAR LOCALIDAD

const postLocalidad = async (req, res, next) => {
  try {
    const { id_localidades, localidad } = req.body;
    const result = await pool.query(
      'SELECT MAX(id_localidades) FROM localidades'
    );
    const lastId = result.rows[0].max || 0;
    const insertQuery =
      'INSERT INTO localidades (id_localidades, localidad ) VALUES ($1, $2)';
    const values = [lastId + 1, localidad];
    await pool.query(insertQuery, values);
    res
      .status(201)
      .json({ message: 'Registro de localidad creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el registro de localidad:', error);
    res.status(500).json({ error: 'Error al crear el registro de localidad' });
  }
};

//* OBTENER UNA LOCALIDAD
const getLocalidad = async (req, res, next) => {
  try {
    const { id_localidades } = req.params;
    const result = await pool.query(
      'SELECT * FROM localidades WHERE id_localidades = $1',
      [id_localidades]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Localidad no encontrada' });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//* ACTUALIZAR LA LOCALIDAD

const putLocalidad = async (req, res, next) => {
  try {
    const stockId = req.params.id_localidades;
    const { localidad } = req.body;
    //* Actualizar el registro de la localidad en la tabla
    const updateQuery =
      'UPDATE localidades SET localidad = $1 WHERE id_localidades = $2';
    const values = [localidad, stockId];
    await pool.query(updateQuery, values);
    res
      .status(200)
      .json({ message: 'Registro de localidad actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el registro de localidad:', error);
    res
      .status(500)
      .json({ error: 'Error al actualizar el registro de localidad' });
  }
};

//* ELIMINAR LOCALIDAD

const deleteLocalidad = async (req, res, next) => {
  try {
    const { id_localidades } = req.params;
    const result = await pool.query(
      'DELETE FROM localidades WHERE id_localidades = $1',
      [id_localidades]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ message: 'Localidad no encontrada' });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllLocalidad,
  postLocalidad,
  getLocalidad,
  putLocalidad,
  deleteLocalidad,
};
