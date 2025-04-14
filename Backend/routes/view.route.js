const express = require("express");
const { getUnresolveCase } = require("../controllers/view.controller");
const { getResolveCase } = require("../controllers/resolveView.controller");
const { pool } = require("../db");

router = express.Router();

router.get("/view", getUnresolveCase);
router.get("/view-resolve", getResolveCase);

router.get("/get-summary", async (req, res) => {
  const { id } = req.query; // Extract ID from query parameters

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Case ID is required" });
  }

  try {
    const result = await pool.query("SELECT * FROM cases WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Case not found" });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("Error fetching case by ID:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
