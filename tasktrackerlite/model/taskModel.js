const db = require('../database/dbconn');
const config = require('../utils/config.json');

module.exports =class TaskDetails{
    constructor(taskID, title, description,dueDate,priority,status){
        this.taskID=taskID;
        this.title=title;
        this.description=description;
        this.dueDate=dueDate;
        this.priority=priority;
        this.status=status;
    }
/**
 * Fetches task details from task tracker table
 * @param {*} callback 
 * @returns - task details
 */
    static fetchTaskDetails(callback){
        try{
            return db.all(config.selectquery,[],(err, rows) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, rows);
            });
          } catch(err){
             console.log("Error while processing request" ,err)
          }
    }

/**
 * Insert task details into taskTracker table
 * @param {*} data - column details of taskTracker table
 * @param {*} callback 
 * @returns 
 */
    static insertTaskDetails(data, callback){
        try{
            db.all(config.insertQuery,[data.taskID,data.title, data.description, data.dueDate, data.priority, data.status],(err, rows) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                //callback(null, rows);                
            });
            return db.all(config.getTaskByTitle,[data.title],(err, rows) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, rows);
            });
          } catch(err){
             console.log("Error while processing request" ,err)
          }
    }

/**
 * deletes task details from TaskTracker table
 * @param {*} taskID - taskID
 * @param {*} callback 
 * @returns 
 */
    static deleteTaskDetails(taskID, callback){
        try{
            return db.all(config.deleteQuery,[taskID],(err, rows) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, rows);
            });
          } catch(err){
             console.log("Error while processing request" ,err)
          }
    }

/**
 * updates task details of taskID in TaskTracker table
 * @param {*} taskID - taskID
 * @param {*} updateData - column data  to be updated
 * @param {*} callback 
 * @returns 
 */
    static updateTaskDetails(taskID, updateData, callback){
        try{
            let updateQuery = 'UPDATE TaskTracker SET ';
            const updateValues = [];
            for (const key in updateData) {
                if (updateData.hasOwnProperty(key)) {
                    updateQuery += `${key} = ?, `;
                    updateValues.push(updateData[key]);
                }
            }
            // Remove the trailing comma and space
            updateQuery = updateQuery.slice(0, -2);
            // Add the WHERE clause
            updateQuery += ' WHERE TaskID = ?';
            updateValues.push(taskID);
        
            return db.all(updateQuery,updateValues,(err, rows) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, rows);
            });
          } catch(err){
             console.log("Error while processing request" ,err)
          }
    }

    static getTaskByTitle(title,callback){
        try{
            return db.all(config.getTaskByTitle,[title],(err, rows) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, rows);
            });
          } catch(err){
             console.log("Error while processing request" ,err)
          }
    }
};