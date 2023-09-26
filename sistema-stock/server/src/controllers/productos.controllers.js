const pool = require('../database/db');

//* OBTENER TODOS LOS PRODUCTOS

const getAllProductos = async (req, res, next) => {
  try {
    const allStock = await pool.query('SELECT * FROM productos');
    res.json(allStock.rows);
  } catch (error) {
    next(error);
  }
};

//* CREAR PRODUCTO

const postProducto = async (req, res, next) => {
  try {
    const { id_producto, nombre_producto } = req.body;
    const result = await pool.query('SELECT MAX(id_producto) FROM productos');
    const lastId = result.rows[0].max || 0;
    const insertQuery =
      'INSERT INTO productos (id_producto, nombre_producto ) VALUES ($1, $2)';
    const values = [lastId + 1, nombre_producto];
    await pool.query(insertQuery, values);
    res
      .status(201)
      .json({ message: 'Registro de producto creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el registro de producto:', error);
    res.status(500).json({ error: 'Error al crear el registro de producto' });
  }
};

//* OBTENER UN PRODUCTO
const getProducto = async (req, res, next) => {
  try {
    const { id_producto } = req.params;
    const result = await pool.query(
      'SELECT * FROM productos WHERE id_producto = $1',
      [id_producto]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Producto no encontrado' });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//* ACTUALIZAR EL PRODUCTO

const putProducto = async (req, res, next) => {
  try {
    const stockId = req.params.id_producto;
    const { nombre_producto } = req.body;
    //* Actualizar el registro de producto en la tabla
    const updateQuery =
      'UPDATE productos SET nombre_producto = $1 WHERE id_producto = $2';
    const values = [nombre_producto, stockId];
    await pool.query(updateQuery, values);
    res
      .status(200)
      .json({ message: 'Registro de producto actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el registro de producto:', error);
    res
      .status(500)
      .json({ error: 'Error al actualizar el registro de producto' });
  }
};

//* ELIMINAR STOCK

const deleteSProducto = async (req, res, next) => {
  try {
    const { id_producto } = req.params;
    const result = await pool.query(
      'DELETE FROM productos WHERE id_producto = $1',
      [id_producto]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ message: 'Stock no encontrado' });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProductos,
  postProducto,
  getProducto,
  putProducto,
  deleteSProducto,
};
