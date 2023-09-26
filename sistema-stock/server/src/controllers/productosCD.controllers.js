const pool = require('../database/db');

//todo OBTENER TODOS LOS PRODUCTOS

const getAllProductosCD = async (req, res, next) => {
  try {
    const allStock = await pool.query('SELECT * FROM productos_codigo');
    res.json(allStock.rows);
  } catch (error) {
    next(error);
  }
};

//* CREAR PRODUCTO

const postProductoCD = async (req, res, next) => {
  try {
    const { id_cd_productos, id_producto, codigo_barra } = req.body;
    const result = await pool.query(
      'SELECT MAX(id_cd_productos) FROM productos_codigo'
    );
    const lastId = result.rows[0].max || 0;
    const insertQuery =
      'INSERT INTO productos_codigo (id_cd_productos, id_producto, codigo_barra ) VALUES ($1, $2, $3)';
    const values = [lastId + 1, id_producto, codigo_barra];
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
const getProductoCD = async (req, res, next) => {
  try {
    const { id_cd_productos } = req.params;
    const result = await pool.query(
      'SELECT * FROM productos_codigo WHERE id_cd_productos = $1',
      [id_cd_productos]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Producto no encontrado' });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//* ACTUALIZAR EL PRODUCTO

const putProductoCD = async (req, res, next) => {
  try {
    const stockId = req.params.id_cd_productos;
    const { id_producto } = req.body;
    //* Actualizar el registro de producto en la tabla
    const updateQuery =
      'UPDATE productos_codigo SET id_producto = $1 codigo_barra = $2 WHERE id_cd_productos = $3';
    const values = [id_producto, codigo_barra, stockId];
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

const deleteSProductoCD = async (req, res, next) => {
  try {
    const { id_cd_productos } = req.params;
    const result = await pool.query(
      'DELETE FROM productos_codigo WHERE id_cd_productos = $1',
      [id_cd_productos]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ message: 'Stock no encontrado' });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProductosCD,
  postProductoCD,
  getProductoCD,
  putProductoCD,
  deleteSProductoCD,
};
