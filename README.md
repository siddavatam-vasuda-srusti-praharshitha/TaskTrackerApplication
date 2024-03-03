# TaskTrackerAPI
****Backend API for updating Database****
 <br />
Backend: Node.js with Express.js <br />
Database: Sqlite3 <br />
IDE: Visual Studio <br />
Libraries : Stored in package.json <br />
  * nodemon - Automatic server restarting.  <br />
  * body-parser - Middleware in Express.js for parsing incoming request bodies(JSON). <br />
  * express-validator - Input validation in an Express.js application. <br />

 Start App.js:
  * Create a TaskTracker table if it doesn't exist.
  * Route GET, POST, PUT, DELETE requests to router.
  * App runs on localhost (9000).

 Routes:
  * getTask.js (/getTasks) - Route GET request to Controller and returns tasks in response.
      * URL: http://localhost:9000/getTasks
      * Response: List of all tasks in JSON. 
  * insertTask.js (/insertTasks) - Route the POST request to controller.
      * URL: http://localhost:9000/insertTasks
      * Request body: JSON
  * updateTask.js (/updateTask)- Route the PUT request to controller.
      * URL: http://localhost:9000/updateTask/:taskID
      * Request body: JSON
  * deleteTask.js (/updateTask) - Route the DELETE request to controller.
       * URL: http://localhost:9000/deleteTask/:taskID
  * Handled input validation while receiving request using express-validator.

Controller:
 * Route the request to model and fetches response in callback from model (result from database).

Model:
 * Implemented methods for all the routes and returns response in callback to controller, by fetching data from TaskTracker table(taskModel.js).
 * Fetches queries from utils/config.json and stores data in database (sqlite.db).
 * Single db connection object is being used in database/dbconn.js for sqlite.db.

****Frontend****
 <br />
Frontend: ReactJS, Javascript <br />
IDE: Visual Studio <br />
Libraries : Stored in package.json <br />
  * @reduxjs/toolkit.  <br />
  * react. <br />
  * react-dropdown. <br />
  * react-notifications. <br />
  * @react-md/divider. <br />
  * react-scripts. <br/>
  * react-dom. <br/>

 App.js:
 * Fetches tasks(http://localhost:5000/getTasks).
 * Renders components CreateTask, FilterTasks, Tasks.

Components:
 * CreateTask.js - Add new tasks (Add task button)
 * FilterTasks.js - Filters the tasks using checkbox (To be Started, In Progress, Completed).
 * Tasks.js - Renders list of tasks
     * Task.js - Represents individual task
        * TaskView.js - displays a modal window with task details and provides options to update the status or delete a task. It uses Redux for state management and makes  HTTP requests to a local server for updating and deleting tasks.

 Redux:
 * Store.js - Configuration for Redux store.
 * TaskSlice.js - Uses the Redux Toolkit to manage application state. Specifically, it defines a Redux slice for managing task-related data and operations i.e., taskList, filterStatus, addTask, updateTask, updateFilterStatus.
