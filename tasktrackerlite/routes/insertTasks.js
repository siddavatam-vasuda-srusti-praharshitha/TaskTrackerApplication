const express = require('express')
const taskController = require('../controllers/taskController')
const { check, validationResult } = require('express-validator')
const router = express.Router()

/**
 * Route the POST request to controller
 * 
 */
router.post('/', [
    check('title').notEmpty().withMessage("title should not be emtpy!!!"),
    check('description').notEmpty().withMessage("Description should not be empty!!!"),
    check('dueDate').isDate().withMessage("Due date must be in valid format YYYY-MM-DD"),
    check('priority').isIn(['High', 'Medium', 'Low']).withMessage("Priority must be one of: Low, Medium, High"),
    check('status').isIn(['To Be Started', 'In Progress', 'Completed']).withMessage('Status must be one of: To be started, In progress, Completed'),
], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const data = req.body;
        taskController.insertTask(data, (err, rows) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Internal server error' });
            }
            let taskId=null;
            rows.forEach(row => {
                taskId = row.taskID;
            });
            res.json({taskID:taskId, status: 200,message:"Data Inserted Successfully"});
        });
    });

module.exports = router;