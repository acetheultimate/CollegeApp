const db = require("../db");

function getCourses(params) {
    db.query('SELECT COURSES ', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });

}