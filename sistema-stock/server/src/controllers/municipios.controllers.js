const pool = require('../database/db');

//* OBTENER LAS MUNICIPIO

const getAllMunicipios = async (req, res, next) => {
  try {
    const allStock = await pool.query('SELECT * FROM municipios');
    res.json(allStock.rows);
  } catch (error) {
    next(error);
  }
};

//* CREAR MUNICIPIO

const postMunicipios = async (req, res, next) => {
  try {
    const { id_municipios, name_municipios } = req.body;
    const result = await pool.query(
      'SELECT MAX(id_municipios) FROM municipios'
    );
    const lastId = result.rows[0].max || 0;
    const insertQuery =
      'INSERT INTO municipios (id_municipios, name_municipios ) VALUES ($1, $2)';
    const values = [lastId + 1, name_municipios];
    await pool.query(insertQuery, values);
    res
      .status(201)
      .json({ message: 'Registro de localidad creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el registro de localidad:', error);
    res.status(500).json({ error: 'Error al crear el registro de localidad' });
  }
};

//* OBTENER UNA MUNICIPIO
const getMunicipios = async (req, res, next) => {
  try {
    const { id_municipios } = req.params;
    const result = await pool.query(
      'SELECT * FROM municipios WHERE id_municipios = $1',
      [id_municipios]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Localidad no encontrada' });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//* ACTUALIZAR LA MUNICIPIO

const putMunicipios = async (req, res, next) => {
  try {
    const stockId = req.params.id_municipios;
    const { name_municipios } = req.body;
    //* Actualizar el registro de la localidad en la tabla
    const updateQuery =
      'UPDATE municipios SET name_municipios = $1 WHERE id_municipios = $2';
    const values = [name_municipios, stockId];
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

//* ELIMINAR MUNICIPIO

const deleteMunicipios = async (req, res, next) => {
  try {
    const { id_municipios } = req.params;
    const result = await pool.query(
      'DELETE FROM municipios WHERE id_municipios = $1',
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
  getAllMunicipios,
  postMunicipios,
  getMunicipios,
  putMunicipios,
  deleteMunicipios,
};
