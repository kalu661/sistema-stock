const dotenv = require('dotenv');

dotenv.config();

const Port = process.env.PORT;
const HostDB = process.env.DB_HOST;
const NameDB = process.env.DB_NAME;
const PassDB = process.env.DB_PASS;
const UserDB = process.env.DB_USER;
const PortDB = process.env.DB_PORT;
const DatabaseURL = process.env.DATABASE_URL;
const SecurityKEY = process.env.SECURITYKEY;

module.exports = {
  Port,
  HostDB,
  NameDB,
  PassDB,
  UserDB,
  PortDB,
  DatabaseURL,
  SecurityKEY,
};
