
const db = require("./db");
queries =
    [
        `create table if not exists courses(
    id int primary key auto_increment,
    courseName varchar(255) not null,
    teacherName varchar(255) not null,
    courseCredits varchar(255) not null,
    )`,
        `create table if not exists students(
    id int primary key auto_increment,
    name varchar(255) not null,
    course int,
    FOREIGN KEY (course) REFERENCES courses(course) 
    )`
    ]

function runSetup() {
    queries.forEach(q => {
        db.query(q)
    });
}

module.exports(runSetup);