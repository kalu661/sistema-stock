const pool = require('../database/db');

//_ GET ALL Obtener Entrada Inge

const getAllIng = async (req, res, next) => {
  try {
    const allInge = await pool.query('SELECT * FROM inge_tabla');
    res.json(allInge.rows);
  } catch (error) {
    next(error);
  }
};

//__ POST Crear un retiro de ingenieria

const postInge = async (req, res, next) => {
  try {
    const { id_inge, ingeniero, producto, cantidad, descripcion, fecha } =
      req.body;
    const result = await pool.query('SELECT MAX(id_inge) FROM inge_tabla');
    const lastId = result.rows[0].max || 0;
    const insertQuery =
      'INSERT INTO inge_tabla ( id_inge, ingeniero, producto, cantidad, descripcion, fecha ) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [
      lastId + 1,
      ingeniero,
      producto,
      cantidad,
      descripcion,
      fecha,
    ];
    await pool.query(insertQuery, values);
    res.status(201).json({ message: 'Registro de ing creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el registro de ing', error);
    res.status(500).json({ error: 'Error al crear el registro del ing' });
  }
};

//_ PUT Actualizar Ingenieria

const putInge = async (req, res, next) => {
  try {
    const ingeId = req.params.id_inge;
    const { ingeniero, producto, cantidad, descripcion, fecha } = req.body;
    const updateQuery =
      'UPDATE inge_tabla SET ingeniero = $1, producto = $2, cantidad = $3, descripcion = $4, fecha = $5 WHERE id_inge = $6';
    const values = [ingeniero, producto, cantidad, descripcion, fecha, ingeId];
    await pool.query(updateQuery, values);
    res
      .status(200)
      .json({ message: 'Registro de ingeniería actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar ingeniería', error);
    res.status(500).json({ error: 'Error al actualizar Ingeniería' });
  }
};

//_ GET Obtener un Ingenieria

const getInge = async (req, res, next) => {
  try {
    const { id_inge } = req.params;
    const result = await pool.query(
      'SELECT * FROM inge_tabla WHERE id_inge = $1',
      [id_inge]
    );

    if (result.rows.length == 0)
      return res.status(404).json({ message: 'Ingenieria no encontrado' });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//_ DELETE Borra Ingenieria

const deleteInge = async (req, res, next) => {
  try {
    const { id_inge } = req.params;
    const result = await pool.query(
      'DELETE FROM inge_tabla WHERE id_inge = $1',
      [id_inge]
    );

    if (result.rowCount == 0)
      return res.status(404).json({ message: 'Ingenieria no encontrada' });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllIng,
  postInge,
  putInge,
  getInge,
  deleteInge,
};
