const pool = require('../database/db');

//* OBTENER LAS DEPARTAMENTO

const getAllDepartamento = async (req, res, next) => {
  try {
    const allStock = await pool.query('SELECT * FROM departamento');
    res.json(allStock.rows);
  } catch (error) {
    next(error);
  }
};

//* CREAR DEPARTAMENTO

const postDepartamento = async (req, res, next) => {
  try {
    const { id_departamento, name_departamento } = req.body;
    const result = await pool.query(
      'SELECT MAX(id_departamento) FROM departamento'
    );
    const lastId = result.rows[0].max || 0;
    const insertQuery =
      'INSERT INTO departamento (id_departamento, name_departamento ) VALUES ($1, $2)';
    const values = [lastId + 1, name_departamento];
    await pool.query(insertQuery, values);
    res
      .status(201)
      .json({ message: 'Registro de localidad creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el registro de localidad:', error);
    res.status(500).json({ error: 'Error al crear el registro de localidad' });
  }
};

//* OBTENER UNA DEPARTAMENTO
const getDepartamento = async (req, res, next) => {
  try {
    const { id_departamento } = req.params;
    const result = await pool.query(
      'SELECT * FROM departamento WHERE id_departamento = $1',
      [id_departamento]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Localidad no encontrada' });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//* ACTUALIZAR LA DEPARTAMENTO

const putDepartamento = async (req, res, next) => {
  try {
    const stockId = req.params.id_departamento;
    const { name_departamento } = req.body;
    //* Actualizar el registro de la localidad en la tabla
    const updateQuery =
      'UPDATE departamento SET name_departamento = $1 WHERE id_departamento = $2';
    const values = [name_departamento, stockId];
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

//* ELIMINAR DEPARTAMENTO

const deleteDepartamento = async (req, res, next) => {
  try {
    const { id_municipios } = req.params;
    const result = await pool.query(
      'DELETE FROM departamento WHERE id_departamento = $1',
      [id_municipios]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ message: 'Localidad no encontrada' });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDepartamento,
  postDepartamento,
  getDepartamento,
  putDepartamento,
  deleteDepartamento,
};
