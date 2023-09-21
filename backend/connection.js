var mysql = require("mysql")

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"gym"
});

module.exports = con;
