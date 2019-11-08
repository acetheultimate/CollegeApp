const db = require("mysql");
const fs = require("fs");

var connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'CollegeApp'
})

connection.connect((err) => {
    if (err) {
        console.error("Could not connect to database.", err);
        process.exit(0);
        return;
    }
    console.log("Connected!");
});

fs.readFile("./.env", "utf8", (err, data) => {
    if (!err) {
        let env = JSON.stringify(data);
        if (!env.setup) {
            const setup = require("./setup");
            setup.runSetup();


        }
    }
})

module.exports = connection;