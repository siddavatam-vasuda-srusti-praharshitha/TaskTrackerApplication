const sqlite3 = require("sqlite3").verbose();
/**
 * Sqlite Database filepath
 */
const filepath = "./sqlite.db";

/**
 * Connect to databse and create a connection which can be used in the app.
 */
const db = new sqlite3.Database(filepath,sqlite3.OPEN_READWRITE, (error) => {
    if (error) {
      return console.error(error.message);
    }
  });

// Export the database connection
module.exports = db;
