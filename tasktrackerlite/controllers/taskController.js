const taskModel = require('../model/taskModel')
/**
 * Route the request to model and fetch all task details
 * @param {*} callback
 */
exports.getAllTasks = async (callback) => {
    try {
        await taskModel.fetchTaskDetails((err, rows) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, rows);
        });
    } catch (err) {
        if (!err.statuscode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

/**
 * Route the request to model and insert task details
 * @param {*} callback
 * @param {} req - Request object containing user data
 */
exports.insertTask = async (data, callback) => {
    try {
        await taskModel.insertTaskDetails(data, (err, rows) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, rows);
        });
    } catch (err) {
        if (!err.statuscode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

/**
 * Route the request to model and delete task details
 * @param {*} taskID - taskID
 * @param {*} callback 
 */
exports.deleteTask = async (taskID, callback) => {
    try {
        await taskModel.deleteTaskDetails(taskID, (err, rows) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, rows);
        });
    } catch (err) {
        if (!err.statuscode) {
            err.statusCode = 500;
        }
        next(err);
    }


};

/**
 * Route the request to model and update task details for the given id
 * @param {*} taskID - taskID
 * @param {*} updateData - key, value pair of fields to be updated in tasks table
 * @param {*} callback 
 */
exports.updateTask = async (taskID, updateData, callback) => {
    try {
        await taskModel.updateTaskDetails(taskID, updateData, (err, rows) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, rows);
        });
    } catch (err) {
        if (!err.statuscode) {
            err.statusCode = 500;
        }
        next(err);
    }
};