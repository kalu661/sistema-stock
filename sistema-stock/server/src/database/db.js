const { Pool } = require('pg');
const dotenv = require('dotenv');
const {
  HostDB,
  NameDB,
  PassDB,
  UserDB,
  PortDB,
} = require('../../config/config');

dotenv.config();

const pool = new Pool({
  user: UserDB,
  host: HostDB,
  database: NameDB,
  password: PassDB,
  port: PortDB,
  ssl: false,
});

module.exports = pool;
