const  {pool}  =require('../db.js')

const createUser = async (req, res) => {
    const { user_name, phone_no, email, address } = req.body;

    if (!user_name || !phone_no || !email || !address) {
        return res.status(400).json({ error: "All user fields are required." });
    }

    try {
        const userResult = await pool.query(
            `INSERT INTO users (user_name, phone_no, email, address) 
        VALUES ($1, $2, $3, $4) RETURNING *`,
            [user_name, phone_no, email, address]
        );

        res.status(201).json({ message: "User created successfully", data: userResult.rows });

    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};



module.exports={createUser}