const pool = require('../database/db');

//* OBTENER TODOS LOS TECNICOS

const getAllTecnico = async (req, res, next) => {
  try {
    const allTecnico = await pool.query('SELECT * FROM tecnicos_nombres');
    res.json(allTecnico.rows);
  } catch (error) {
    next(error);
  }
};

//* CREAR TECNICO

const postTecnico = async (req, res, next) => {
  try {
    const { id_tecnico, name, lastname, estado } = req.body;
    const result = await pool.query(
      'SELECT MAX(id_tecnico) FROM tecnicos_nombres'
    );
    const lastId = result.rows[0].max || 0;
    const insertQuery =
      'INSERT INTO tecnicos_nombres (id_tecnico, name, lastname, estado ) VALUES ($1, $2, $3, $4)';
    const values = [lastId + 1, name, lastname, estado];
    await pool.query(insertQuery, values);
    res
      .status(201)
      .json({ message: 'Registro de tecnico creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el registro de tecnico:', error);
    res.status(500).json({ error: 'Error al crear el registro de tecnico' });
  }
};

//* OBTENER UN TECNICO
const getTecnico = async (req, res, next) => {
  try {
    const { id_tecnico } = req.params;
    const result = await pool.query(
      'SELECT * FROM tecnicos_nombres WHERE id_tecnico = $1',
      [id_tecnico]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Tecnico no encontrado' });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//* ACTUALIZAR EL TECNICO

const putTecnico = async (req, res, next) => {
  try {
    const stockId = req.params.id_tecnico;
    const { name, lastname, estado } = req.body;
    //* Actualizar el registro de tecnico en la tabla
    const updateQuery =
      'UPDATE tecnicos_nombres SET name = $1, lastname = $2, estado = $3 WHERE id_tecnico = $4';
    const values = [name, lastname, estado, stockId];
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

//* ELIMINAR TECNICO

const deleteTecnico = async (req, res, next) => {
  try {
    const { id_tecnico } = req.params;
    const result = await pool.query(
      'DELETE FROM tecnicos_nombres WHERE id_tecnico = $1',
      [id_tecnico]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ message: 'Tecnico no encontrado' });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTecnico,
  postTecnico,
  getTecnico,
  putTecnico,
  deleteTecnico,
};
