const pool = require('../database/db');

//todo OBTENER TODOS LOS RETIROs

const getAllRetiro = async (req, res, next) => {
  try {
    const allRetiro = await pool.query('SELECT * FROM retiro_table');
    res.json(allRetiro.rows);
  } catch (error) {
    next(error);
  }
};

//todo CREAR UN RETIRO

const postRetiro = async (req, res, next) => {
  try {
    const { producto, cantidad, tecnico, fecha_hora, descripcion } = req.body;
    const result = await pool.query('SELECT MAX(id_retiro) FROM retiro_table');
    const lastId = result.rows[0].max || 0;
    const insertQuery =
      'INSERT INTO retiro_table ( id_retiro, producto, cantidad, tecnico, fecha_hora, descripcion ) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [
      lastId + 1,
      producto,
      cantidad,
      tecnico,
      fecha_hora,
      descripcion,
    ];
    await pool.query(insertQuery, values);
    res.status(201).json({ message: 'Registro de retiro creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el registro de Retiro', error);
    res.status(500).json({ error: 'Error al crear el registro del retiro' });
  }
};

//todo OBTENER UN RETIRO
const getRetiro = async (req, res, next) => {
  try {
    const { id_retiro } = req.params;
    const result = await pool.query(
      'SELECT * FROM retiro_table WHERE id_retiro = $1',
      [id_retiro]
    );

    if (result.rows.length == 0)
      return res.status(404).json({ message: 'Retiro no encontrado' });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//todo ACTUALIZAR EL RETIRO

const putRetiro = async (req, res, next) => {
  try {
    const retiroId = req.params.id_retiro;
    const { producto, cantidad, tecnico, fecha_hora, descripcion } = req.body;
    const updateQuery =
      'UPDATE retiro_table SET producto = $1, cantidad = $2, tecnico =$3, fecha_hora = $4, descripcion =$5 WHERE id_retiro = $6';
    const values = [
      producto,
      cantidad,
      tecnico,
      fecha_hora,
      descripcion,
      retiroId,
    ];
    await pool.query(updateQuery, values);
    res
      .status(200)
      .json({ meesage: 'Registro de retiro actualizando exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el registro del Retiro', error);
    res
      .status(509)
      .json({ error: 'Error al actualizar el registro de Retiro' });
  }
};

//_ ELIMINAR RETIRO

const deleteRetiro = async (req, res, next) => {
  try {
    const { id_retiro } = req.params;
    const result = await pool.query(
      'DELETE FROM retiro_table WHERE id_retiro = $1',
      [id_retiro]
    );

    if (result.rowCount == 0)
      return res.status(404).json({ message: 'Retiro no encontrado' });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRetiro,
  postRetiro,
  getRetiro,
  putRetiro,
  deleteRetiro,
};
