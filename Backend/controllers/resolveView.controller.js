const { pool } = require("../db.js")

const getResolveCase = async (req, res) => {
    try {
        const cases = await pool.query(
            `SELECT 
          cases.id AS case_id,
          cases.case_name,
          cases.case_file_link,
          cases.creation_timestamp,
          cases.resolved_timestamp,
          cases.resolve_status,
          users.id AS user_id,
          users.user_name,
          users.phone_no,
          users.email,
          users.address
        FROM cases
        JOIN users ON cases.user_id = users.id
        WHERE cases.resolve_status=true
        ORDER BY cases.creation_timestamp DESC`
        );

        res.status(200).json({ message: "Cases retrieved successfully", data: cases.rows });

    } catch (err) {
        console.error("Error fetching cases:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports={getResolveCase}