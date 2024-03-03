const express = require('express')
const app = express()
/**
 * Port on which app should run
 */
const port = 5000

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
/**
 * Create TaskTracker table if not exists
 */
const CreateTable = require("./model/createTable");
const createTable = new CreateTable();
createTable.createTaskTracker();

/**
 * Route GET request to  /getTasks for getting all tasks from the database
 */
const getAllTasks = require('./routes/getTasks');
app.use('/getTasks', getAllTasks)

/**
 * Route POST  request to /insertTasks for adding a task in the database
 */
const insertTasks = require('./routes/insertTasks');
app.use('/insertTasks', insertTasks)

/**
 * Route DELETE request  to /deleteTask/:taskID for deleting a specific task by its taskID
 */
const deleteTask = require('./routes/deleteTask');
app.use('/deleteTask', deleteTask)

/**
 * Route PUT request to  /updateTask/:taskID to update a specific  task by its taskID
 */
const updateTask = require('./routes/updateTask');
app.use('/updateTask', updateTask)

/**
 * App runs  on http://localhost:9000
 */
app.listen(port, () => console.log(`Listening on port ${port}`))