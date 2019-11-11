
const db = require("./db");
queries =
    [
        `create table if not exists courses(
    id int primary key auto_increment,
    courseName varchar(255) not null,
    teacherName varchar(255) not null,
    courseCredits varchar(255) not null)`,
        `create table if not exists students(
    id int primary key auto_increment,
    name varchar(255) not null,
    course int,
    FOREIGN KEY (course) REFERENCES courses(id))`
    ]

function runSetup() {
    return new Promise((resolve, reject) => {
        try {
            queries.forEach(q => {
                db.query(q);
            });
        }
        catch (error) {
            console.error("Error while setting up DB.")
            return reject(-1);
        }
        return resolve();
    })
}

module.exports = runSetup;