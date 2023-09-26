const pool = require('../database/db');

//todo GET traer todas las devoluciones
const getAllDevoluciones = async (req, res, next) => {
  try {
    const allDevo = await pool.query('SELECT * FROM devolucion_entrada');
    res.json(allDevo.rows);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//* POST Crear una Devolucion

const postDevolucion = async (req, res, next) => {
  try {
    const { encargado, producto, cantidad, fecha, descripcion } = req.body;
    const result = await pool.query(
      'SELECT MAX(id_devolucion) FROM devolucion_entrada'
    );
    const lastId = result.rows[0].max || 0;
    const inserQuery =
      'INSERT INTO devolucion_entrada (id_devolucion, encargado, producto, cantidad, fecha, descripcion) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [
      lastId + 1,
      encargado,
      producto,
      cantidad,
      fecha,
      descripcion,
    ];
    await pool.query(inserQuery, values);
    res.status(201).json({ message: 'Registro de Devolucion creado' });
  } catch (error) {
    console.error('Error al crear el registro de devolucion', error);
    res.status(500).json({ error: 'Error al crear el registro de devolucion' });
  }
};

//? GET ID Obtener una Devolucion

const getDevolucion = async (req, res, next) => {
  try {
    const { id_devolucion } = req.params;
    const result = await pool.query(
      'SELECT * FROM devolucion_entrada WHERE id_devolucion = $1',
      [id_devolucion]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Devolucion no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//_ PUT Actualizar una Devolucion

const putDevolucion = async (req, res, next) => {
  try {
    const devoId = req.params.id_devolucion;
    const { encargado, producto, cantidad, fecha, descripcion } = req.body;
    // Actualizar el registro de producto en la tabla
    const updateQuery =
      'UPDATE devolucion_entrada SET encargado = $1, producto = $2, cantidad = $3, fecha = $4, descripcion = $5 WHERE id_devolucion = $6';
    const values = [encargado, producto, cantidad, fecha, descripcion, devoId];
    await pool.query(updateQuery, values);
    res
      .status(200)
      .json({ message: 'Registro de Devolucion actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el registro de Devolucion', error);
    res
      .status(500)
      .json({ message: 'Error al actualizar el registro de Devolucion' });
  }
};

//! DELETE Eliminar una Devolucion

const deleteDevoluciones = async (req, res, next) => {
  try {
    const { id_devolucion } = req.params;
    const result = await pool.query(
      'DELETE FROM devolucion_entrada WHERE id_devolucion = $1',
      [id_devolucion]
    );

    if (result.rowCount == 0)
      return res.status(404).json({ message: 'Devolucion no encontrado' });
    return res.sendStatus(204);
  } catch (error) {
    next;
  }
};

module.exports = {
  getAllDevoluciones,
  postDevolucion,
  getDevolucion,
  putDevolucion,
  deleteDevoluciones,
};
