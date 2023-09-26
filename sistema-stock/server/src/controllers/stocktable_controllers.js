const pool = require('../database/db');

//* OBTENER EL STOCK

const getAllStockTB = async (req, res, next) => {
  try {
    const allStock = await pool.query('SELECT * FROM entrada_table;');
    res.json(allStock.rows);
  } catch (error) {
    next(error);
  }
};

//* CREAR STOCK

const postStockTB = async (req, res, next) => {
  try {
    const { id_entrada_tb, producto, cantidad, fecha, codigo_barra } = req.body;
    const result = await pool.query(
      'SELECT MAX(id_entrada_tb) FROM entrada_table'
    );
    const lastId = result.rows[0].max || 0;
    const insertQuery =
      'INSERT INTO entrada_table (id_entrada_tb, producto, cantidad, fecha, codigo_barra ) VALUES ($1, $2, $3, $4, $5)';
    const values = [lastId + 1, producto, cantidad, fecha, codigo_barra];
    await pool.query(insertQuery, values);
    res.status(201).json({ message: 'Registro de stock creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el registro de stock:', error);
    res.status(500).json({ error: 'Error al crear el registro de stock' });
  }
};

//* OBTENER UN STOCK
const getStockTB = async (req, res, next) => {
  try {
    const { id_entrada_tb } = req.params;
    const result = await pool.query(
      'SELECT * FROM entrada_table WHERE id_entrada_tb = $1',
      [id_entrada_tb]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Stock no encontrada' });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//* ACTUALIZAR LA STOCK

const putStockTB = async (req, res, next) => {
  try {
    const stockId = req.params.id_entrada_tb;
    const { producto, cantidad, fecha } = req.body;
    //* Actualizar el registro del stock en la tabla
    const updateQuery =
      'UPDATE entrada_table SET producto = $1, cantidad = $2, fecha = $3, codigo_barra = $4 WHERE id_entrada_tb = $5';
    const values = [producto, cantidad, fecha, codigo_barra, stockId];
    await pool.query(updateQuery, values);
    res
      .status(200)
      .json({ message: 'Registro de stock actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el registro de stock:', error);
    res.status(500).json({ error: 'Error al actualizar el registro de stock' });
  }
};

//* ELIMINAR STOCK

const deleteStockTB = async (req, res, next) => {
  try {
    const { id_entrada_tb } = req.params;
    const result = await pool.query(
      'DELETE FROM entrada_table WHERE id_entrada_tb = $1',
      [id_entrada_tb]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ message: 'Stock no encontrada' });
    return res
      .sendStatus(204)
      .json({ message: 'Stock eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllStockTB,
  postStockTB,
  putStockTB,
  deleteStockTB,
  getStockTB,
};
