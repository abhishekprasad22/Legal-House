const {pool} = require("../db.js") 

const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    phone_no VARCHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address TEXT NOT NULL
);`;

  try {
    await pool.query(query);
    console.log("✅ User table is ready!");
  } catch (err) {
    console.error("❌ Error creating case table:", err);
  }
};

createTable();

module.exports={pool}
