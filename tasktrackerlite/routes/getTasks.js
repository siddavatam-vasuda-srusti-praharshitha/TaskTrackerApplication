const express = require('express')
const taskController = require('../controllers/taskController')

const router = express.Router()

/**
 * Route the GET request to controller
 * return all tasks in JSON format
 */
router.get( '/', (req, res) => {
    taskController.getAllTasks((err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(rows);
    });
});

module.exports= router;