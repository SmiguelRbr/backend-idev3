const mysql = require('mysql')

const pool = mysql.createPool({
    "user": "root",
    "password": "root",
    "database": "mydb",
    "host": "localhost",
    "port": "3306"
})