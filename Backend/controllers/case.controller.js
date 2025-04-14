const { pool } = require("../db");

const createCase = async (req, res) => {
    const { user_id, case_name } = req.body;

    // Ensure a file is uploaded
    if (!req.file) {
        return res.status(400).json({ error: "Case file (PDF) is required." });
    }

    const case_file_link = `/uploads/${req.file.filename}`;

    if (!user_id || !case_name) {
        return res.status(400).json({ error: "User ID and case name are required." });
    }

    try {
        // Check if user exists
        const userExists = await pool.query(`SELECT id FROM users WHERE id = $1`, [user_id]);

        if (userExists.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // Insert case into database
        const caseResult = await pool.query(
            `INSERT INTO cases (user_id, case_name, case_file_link, resolve_status) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [user_id, case_name, case_file_link, false]
        );

        res.status(201).json({ message: "Case created successfully", data: caseResult.rows[0] });
    } catch (err) {
        console.error("Error creating case:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { createCase };
