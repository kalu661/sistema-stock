const pool = require('../database/db');

//* OBTENER EL STOCK

const getAllStock = async (req, res, next) => {
  try {
    const allStock = await pool.query(
      'SELECT productos.nombre_producto, stock_ingresos.cantidad_pd FROM stock_ingresos JOIN productos ON productos.nombre_producto = stock_ingresos.cantidad_pd;'
    );
    res.json(allStock.rows);
  } catch (error) {
    next(error);
  }
};

//* CREAR STOCK

const postStock = async (req, res, next) => {
  try {
    const { id_stock_ingreso, productos_id, cantidad_pd } = req.body;
    const result = await pool.query(
      'SELECT MAX(id_stock_ingreso) FROM stock_ingresos'
    );
    const lastId = result.rows[0].max || 0;
    const insertQuery =
      'INSERT INTO stock_ingresos (id_stock_ingreso, productos_id, cantidad_pd ) VALUES ($1, $2, $3)';
    const values = [lastId + 1, productos_id, cantidad_pd];
    await pool.query(insertQuery, values);
    res.status(201).json({ message: 'Registro de stock creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el registro de stock:', error);
    res.status(500).json({ error: 'Error al crear el registro de stock' });
  }
};

//* OBTENER UN STOCK
const getStock = async (req, res, next) => {
  try {
    const { id_stock_ingreso } = req.params;
    const result = await pool.query(
      'SELECT * FROM stock_ingresos WHERE id_stock_ingreso = $1',
      [id_stock_ingreso]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Stock no encontrada' });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//* ACTUALIZAR LA STOCK

const putStock = async (req, res, next) => {
  try {
    const stockId = req.params.id_stock_ingreso;
    const { productos_id, cantidad_pd } = req.body;
    //* Actualizar el registro del stock en la tabla
    const updateQuery =
      'UPDATE stock_ingresos SET productos_id = $1, cantidad_pd = $2 WHERE id_stock_ingreso = $3';
    const values = [productos_id, cantidad_pd, stockId];
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

const deleteStock = async (req, res, next) => {
  try {
    const { id_stock_ingreso } = req.params;
    const result = await pool.query(
      'DELETE FROM stock_ingresos WHERE id_stock_ingreso = $1',
      [id_stock_ingreso]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ message: 'Stock no encontrada' });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllStock,
  postStock,
  putStock,
  deleteStock,
  getStock,
};
