import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: "localhost",
  port: 5432,
});

// ✅ Test DB connection
pool.connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch(err => console.error("DB connection error", err));

/* =========================
   EXECUTE SQL QUERY ROUTE
   ========================= */
app.post("/execute", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  // 🔒 Allow only SELECT queries
  const normalized = query.trim().toLowerCase();
  if (!normalized.startsWith("select")) {
    return res.status(403).json({
      error: "Only SELECT queries are allowed",
    });
  }

  try {
    const result = await pool.query(query);
    res.json({ rows: result.rows });
  } catch (err) {
    console.error("SQL Error:", err.message);
    res.status(500).json({
      error: "Failed to execute query",
    });
  }
});

/* =========================
   HINT ROUTE (STATIC SAFE)
   ========================= */
app.post("/hint", (req, res) => {
  const { question } = req.body;

  let hint = "Think about what columns you need.";

  if (question?.toLowerCase().includes("all employees")) {
    hint = "Use SELECT * to retrieve all rows from the table.";
  } else if (question?.toLowerCase().includes("department")) {
    hint = "Use a WHERE clause to filter by department.";
  }

  res.json({ hint });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
