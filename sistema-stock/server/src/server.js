const express = require('express');
const urlencoded = require('express');
const dontenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

const pool = require('./database/db');
const { Port } = require('../config/config');

//* inicializaciones
const app = express();
dontenv.config();
pool.connect();

//* Configuración de middlewares
//* (funciones que se ejecutan antes de que lleguen a las rutas)
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(urlencoded({ extended: false }));

//? Rutas
app.use('/', require('./routes/stock.routes.js'));
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/tecnicos', require('./routes/tecnicos.routes'));
app.use('/', require('./routes/user.routes'));
app.use('/api/localidades', require('./routes/localidades.routes'));
app.use('/api/municipios', require('./routes/municipios.routes'));
app.use('/api/departamentos', require('./routes/departamento.routes'));
app.use('/', require('./routes/productoCD.routes'));
app.use('/', require('./routes/retiro.routes'));
app.use('/', require('./routes/stocktable.routes'));
app.use('/', require('./routes/salida.routes'));
app.use('/', require('./routes/devolucion.routes'));
app.use('/', require('./routes/inge.routes'));

//* Mostamos en consola si se realizo la conexion con la base de datos correctamente
//* y mostramos un mensaje cuando el servidor esta corriendo y la ruta
app.listen(Port, () => {
  console.log('Servidor corriendo en http://localhost:' + Port);
});
