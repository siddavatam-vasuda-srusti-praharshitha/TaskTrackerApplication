const express = require('express')
const taskController = require('../controllers/taskController')
const { check, validationResult } = require('express-validator')

const router = express.Router()

/**
 * Input validation from requst
 * @param {*} req  - request
 * @param {*} res - response
 * @param {*} next 
 */
const validateUpdateTask = (req, res, next) => {
    const allowedFields = ['title', 'description', 'dueDate', 'priority', 'status'];
    const validationRules = [];
    allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
            switch (field) {
                case 'title':
                    validationRules.push(check('title').notEmpty().withMessage('Title is required'));
                    break;
                case 'description':
                    validationRules.push(check('description').notEmpty().withMessage('Description is required'));
                    break;
                case 'dueDate':
                    validationRules.push(check('dueDate').isDate().withMessage("Due date must be in valid format YYYY-MM-DD"));
                    break;
                case 'priority':
                    validationRules.push(check('priority').isIn(['Low', 'Medium', 'High']).withMessage('Priority must be one of: Low, Medium, High'));
                    break;
                case 'status':
                    validationRules.push(check('status').isIn(['To Be Started', 'In Progress', 'Completed']).withMessage('Status must be one of: To be started, In progress, Completed'));
                    break;
                default:
                    break;
            }
        }
    });

     // Apply validation rules
     Promise.all(validationRules.map(rule => rule.run(req)))
     .then(() => {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
             return res.status(400).json({ errors: errors.array() });
         }
         next();
     });
};

/**
 * Route the PUT request to controller
 * 
 */
router.put('/:id',validateUpdateTask, (req, res) => {
    const taskID = req.params.id;
    const updateData = req.body;
    taskController.updateTask(taskID, updateData, (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json({status:200, message:"Data Updated successfully!!!"});
    });
});


module.exports = router;