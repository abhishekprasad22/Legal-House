const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

// Database Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,

  // connectionString:process.env.DATABASE_URL,
});

pool
  .connect()
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(`Connection Error: ${err.stack}`);
  });

module.exports = { pool };
