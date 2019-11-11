const db = require("../db");


class Courses {

    createCourse(values) {
        let query = "INSERT INTO courses (courseName, teacherName, courseCredits) VALUES (?, ?, ?)";
        return new Promise((resolve, reject) => {
            db.query(query, values, (err, result) => {
                if (err) {
                    console.error("Error while creating course", err);
                    return reject()
                }
                return resolve()
            })


        })
    }

    getCourses(selects, predicate, values) {
        return new Promise((resolve, reject) => {
            query = "SELECT "
            query += selects.join(", ")
            query += " FROM COURSES WHERE "
            query += predicate
            values = values.map(db.escape);
            db.query(query, values, (err, results) => {
                if (err) {
                    console.error("Error listing courses!", err);
                    return reject();
                }
                return resolve(results);
            })
        })
    }

    getAllCourses() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM courses;", (err, results) => {
                if (err) {
                    console.error("Error listing courses!", err);
                    return reject();
                }
                return resolve(results);
            })

        })
    }

}

module.exports = {
    Courses: Courses
}