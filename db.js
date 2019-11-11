const mysql = require("mysql");
const fs = require("fs");

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
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
        let env = JSON.parse(data);
        if (!env.setup) {
            const setup = require("./setup");
            setup().then(result => {
                env.setup = 1;
                fs.writeFile("./.env", JSON.stringify(env), (error) => {
                    if (error)
                        console.warn("Error while saving setup file, setup complete!", error)
                });
            });
        }
    }
})

module.exports = connection;