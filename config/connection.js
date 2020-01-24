var mysql = require("mysql");
connection = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"password123!",
    database:"burgers_db"
})

connection.connect();
module.exports = connection;