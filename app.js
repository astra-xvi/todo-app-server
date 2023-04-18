const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require("./config/db");

const app = express();

//middleware
app.use(cors());
app.use(express.json());
dotenv.config();

const port = process.env.PORT;

//routes
app.get('/', (req, res) => {
    response.json({ info: 'Node.js, Express, and Postgres API' });
});

//create a todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        console.log(description);
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
        res.json(newTodo.rows);

    } catch (error) {
        console.error(error.message);
    }
});

//get all todo
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query(
            "SELECT * FROM todo");
        res.json(allTodos.rows);

    } catch (error) {
        console.error(error.message);
    }
});

//get a todo
app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id =  $1", [id]);
        res.json(todo.rows);

    } catch (error) {
        console.error(error.message);
    }
});

//update a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id =  $2", [description, id]);

        res.json("Todo update successfully!");

    } catch (error) {
        console.error(error.message);
    }
});

//delete a todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(
            "DELETE FROM todo WHERE todo_id =  $1", [id]);

        res.json("Todo deleted successfully!");

    } catch (error) {
        console.error(error.message);
    }
});

app.listen(port, () => {
    console.log(`Application running on port ${port}`);
});