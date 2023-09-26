const pool = require('../database/db');

// Obtener todas las salidas
const getSalidas = async (req, res, next) => {
  try {
    const allStock = await pool.query('SELECT * FROM salida_tabla;');
    res.json(allStock.rows);
  } catch (error) {
    next(error);
  }
};

// Obtener una salida por su ID
const getSalidaById = async (req, res, next) => {
  try {
    const { id_salida_tb } = req.params;
    const result = await pool.query(
      'SELECT * FROM salida_tabla WHERE id_salida_tb = $1',
      [id_salida_tb]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Salida no encontrada' });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Crear una salida
const createSalida = async (req, res) => {
  try {
    const {
      conductor_tec,
      solo,
      apoyo_tec,
      cant_insumos,
      productos,
      fecha,
      descripcion,
    } = req.body;
    const result = await pool.query(
      'SELECT MAX(id_salida_tb) FROM salida_tabla'
    );
    const lastId = result.rows[0].max || 0;
    const insertQuery =
      'INSERT INTO salida_tabla (id_salida_tb, conductor_tec, solo, apoyo_tec, cant_insumos, productos, fecha, descripcion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [
      lastId + 1,
      conductor_tec,
      solo,
      apoyo_tec,
      cant_insumos,
      productos,
      fecha,
      descripcion,
    ];
    await pool.query(insertQuery, values);
    res
      .status(201)
      .json({ message: 'Registro de producto creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el registro de producto:', error);
    res.status(500).json({ error: 'Error al crear el registro de producto' });
  }
};

// Actualizar una salida
const updateSalida = async (req, res) => {
  try {
    const stockId = req.params.id_salida_tb;
    const {
      conductor_tec,
      solo,
      apoyo_tec,
      cant_insumos,
      productos,
      fecha,
      descripcion,
    } = req.body;
    //* Actualizar el registro de tecnico en la tabla
    const updateQuery =
      'UPDATE salida_tabla SET conductor_tec = $1, solo = $2, apoyo_tec = $3, cant_insumos = $4, productos = $5, fecha = $6, descripcion = $7 WHERE id_salida_tb = $8';
    const values = [
      conductor_tec,
      solo,
      apoyo_tec,
      cant_insumos,
      productos,
      fecha,
      descripcion,
      stockId,
    ];
    await pool.query(updateQuery, values);
    res
      .status(200)
      .json({ message: 'Registro de tecnico actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el registro de tecnico:', error);
    res
      .status(500)
      .json({ error: 'Error al actualizar el registro de tecnico' });
  }
};

// Eliminar una salida
const deleteSalida = async (req, res, next) => {
  try {
    const { id_salida_tb } = req.params;
    const result = await pool.query(
      'DELETE FROM salida_tabla WHERE id_salida_tb = $1',
      [id_salida_tb]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ message: 'Salida no encontrado' });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSalidas,
  getSalidaById,
  createSalida,
  updateSalida,
  deleteSalida,
};
