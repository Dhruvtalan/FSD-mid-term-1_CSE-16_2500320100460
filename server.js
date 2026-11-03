const express = require('express');

const app = express();

app.use(express.json());

let students = [];

// POST API - Add student
app.post('/api/students', (req, res) => {
    const { id, name, email, course, age } = req.body;

    if (!id || !name || !email || !course || age === undefined) {
        return res.status(400).json({
            message: "All fields are mandatory"
        });
    }

    const exists = students.find(student => student.id == id);

    if (exists) {
        return res.status(409).json({
            message: "Student ID already exists"
        });
    }

    const student = { id, name, email, course, age };

    students.push(student);

    res.status(201).json({
        message: "Student added successfully",
        student: student
    });
});


// GET API - Retrieve all students
app.get('/api/students', (req, res) => {
    res.status(200).json({
        message: "Students retrieved successfully",
        students: students
    });
});


// GET API - Retrieve student by ID
app.get('/api/students/:id', (req, res) => {
    const id = req.params.id;

    const student = students.find(s => s.id == id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json({
        message: "Student retrieved successfully",
        student: student
    });
});


// PUT API - Update student
app.put('/api/students/:id', (req, res) => {
    const id = req.params.id;

    const student = students.find(s => s.id == id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, email, course, age } = req.body;

    if (!name || !email || !course || age === undefined) {
        return res.status(400).json({
            message: "All fields are mandatory"
        });
    }

    student.name = name;
    student.email = email;
    student.course = course;
    student.age = age;

    res.status(200).json({
        message: "Student updated successfully",
        student: student
    });
});


// DELETE API - Delete student
app.delete('/api/students/:id', (req, res) => {
    const id = req.params.id;

    const index = students.findIndex(s => s.id == id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students.splice(index, 1);

    res.status(200).json({
        message: "Student deleted successfully"
    });
});


// Start server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});