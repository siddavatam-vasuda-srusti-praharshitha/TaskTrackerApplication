const db = require('../database/dbconn');
const express = require('express');

const createQuery= `CREATE TABLE IF NOT EXISTS TaskTracker (
    taskID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    title TEXT NOT NULL UNIQUE,
	description TEXT NOT NULL,
    dueDate TEXT NOT NULL ,
    priority TEXT NOT NULL ,
	status TEXT NOT NULL )`;

/**
 * Create TaskTracker table if not exists in the database
 */
class CreateTable{
        constructor() {
            this.app = express();
        }
        /**
         * Run create query into database
         */
        createTaskTracker(){
            try{
                db.all(createQuery);
                console.log("Table created successfully");
            } catch(err){
                console.log("Exception while creating table", err)
            }
        }
    };

module.exports = CreateTable;