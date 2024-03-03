const express = require('express')
const taskController = require('../controllers/taskController')

const router = express.Router()

/**
 * Route the DELETE request to controller
 * 
 */
router.delete('/:id', (req, res) => {
    const taskID = req.params.id;
    taskController.deleteTask(taskID, (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json({status:200, message:"Data Deleted successfully!!!"});
    });
});

module.exports = router;