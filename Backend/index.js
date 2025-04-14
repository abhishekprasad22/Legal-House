const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { pool } = require("./db.js");
require("./models/case.model.js");
require("./models/user.model.js");

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  console.log(`Server is running on PORT ${PORT}`);
});

const createRoutes = require("./routes/create.route.js");
const viewRoutes = require("./routes/view.route.js");
const summerizeRoute = require("./routes/summerize.route.js");

app.use("/api/v1/create", createRoutes);
app.use("/api/v1/view", viewRoutes);
app.use("/api/v1/", summerizeRoute);
