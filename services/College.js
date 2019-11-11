const db = require("../db");


class Courses {
    createCourse(values) {
        let query = "INSERT INTO courses (courseName, courseCredits, teacherName) VALUES (?, ?, ?)";
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
            let query = "SELECT "
            query += selects.join(", ")
            query += " FROM COURSES WHERE "
            query += predicate
            values = values.map(value => { return db.escape(value) });
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

class Students {
    enroll(values) {
        let query = "INSERT INTO students (name, course) VALUES (?, ?)";
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

    getStudents(selects, predicate, values) {
        return new Promise((resolve, reject) => {
            let query = "SELECT "
            query += selects.join(", ")
            query += " FROM students s INNER JOIN courses c ON s.course=c.id WHERE "
            query += predicate
            db.query(query, values, (err, results) => {
                if (err) {
                    console.error("Error listing courses!", err);
                    return reject();
                }
                return resolve(results);
            })
        })
    }

    getAllStudents() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM students s INNER JOIN courses c ON s.course=c.id;", (err, results) => {
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
    Courses: Courses,
    Students: Students
}