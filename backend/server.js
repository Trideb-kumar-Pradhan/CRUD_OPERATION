require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Create a new student (receive member id, name, age, email)
app.post("/api/students", async (req, res) => {
    try {
        const { memberId, name, age, email } = req.body;

        // Insert student with provided data
        const newStudent = await pool.query(
            "INSERT INTO students (member_id, name, age, email) VALUES ($1, $2, $3, $4) RETURNING *", 
            [memberId, name, age, email]
        );
        res.json(newStudent.rows[0]);
    } catch (err) {
        console.error("Error inserting student:", err);
        res.status(500).json({ error: err.message });
    }
});

// Get all students (no calculation, just retrieve the stored data)
app.get("/api/students", async (req, res) => {
    try {
        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const offset = (page - 1) * limit;

        const students = await pool.query(
            `SELECT * FROM students LIMIT $1 OFFSET $2`,
            [limit, offset]
        );

        const totalCount = await pool.query("SELECT COUNT(*) FROM students");

        res.json({
            data: students.rows,
            totalRecords: parseInt(totalCount.rows[0].count),
            totalPages: Math.ceil(totalCount.rows[0].count / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a student by ID (retrieve member id, name, age, email)
app.get("/api/students/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const student = await pool.query(
            `SELECT * FROM students WHERE id = $1`,
            [id]
        );

        if (student.rows.length === 0) return res.status(404).json({ message: "Student not found" });

        res.json(student.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a student (update member id, name, age, email)
app.put("/api/students/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { memberId, name, age, email } = req.body;

        const updatedStudent = await pool.query(
            "UPDATE students SET member_id = $1, name = $2, age = $3, email = $4 WHERE id = $5 RETURNING *", 
            [memberId, name, age, email, id]
        );
        res.json(updatedStudent.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a student
app.delete("/api/students/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM students WHERE id = $1", [id]);
        res.json({ message: "Student deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
