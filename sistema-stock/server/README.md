# Gestor y Control de Stock

===============================================

### Descripcion

Es un sistema para los encargados del stock que mediante **formularios** les permitira cargar los datos correspondientes a su vez contara con una seccion de **graficos** y **tablas** donde podran visualizar todo el stock.

### Tecnologias utilizadas

**Base de datos**

- Postgresql
  - Dependencias necesarias para su conexion
    - pg
    - pg-hstore

**Backend**

- NodeJS
- DevDependencias
  - nodemon
  - Dependencias
    - cors
    - dotenv
    - express
    - morgan
    - urlencode

**Frontend**

### Modelo de la base de datos

### Estructura del Proyecto

- ##### **Backend**

└📁 server/
├───📁 config/
│ └───📄 config.js
├───📁 src/
│ ├───📁 controllers/
│ │ ├───📄 productos.controllers.js
│ │ ├───📄 stock.controllers.js
│ │ ├───📄 tecnicos.controllers.js
│ │ └───📄 user.controllers.js
│ ├───📁 database/
│ │ ├───📄 database.sql
│ │ └───📄 db.js
│ ├───📁 models/
│ │ └───📄 databse.model.sql
│ ├───📁 routes/
│ │ ├───📄 productos.routes.js
│ │ ├───📄 stock.routes.js
│ │ ├───📄 tecnicos.routes.js
│ │ └───📄 user.routes.js
│ └───📄 server.js
├───📄 .env
├───📄 .gitignore
├───📄 package-lock.json
├───📄 package.json
└───📄 README.md

- ##### **Frontend**

### Interfaz

Contara con un **Login** (Inicio de sesion) para los usuarios y no permitira el acceso a cualquier persona.
Una vez iniciado sesion tendra un **panel** de administracion donde podra vizualizar a manera de **graficos** y **tablas**, a su vez contara con un par de botones en dicho **panel** el cual le llevara a los distintos formularios para hacer la carga de datos e informacion.

#### - Formularios

#### - Tablas y Graficos

tree-extended -ignore="node_modules" -max=2 -charset=utf8-icons
