
const express = require("express");
const router = express.Router();
const VerifyToken = require("../auth/VerifyToken");
const CollegeServices = require("../services/College");

const Courses = new CollegeServices.Courses();
const Student = new CollegeServices.Students();

function hasValuesFor(keys, Obj) {
    return keys.every(key => key in Obj);

}
router.get("/getCourses", VerifyToken, (req, res) => {
    Courses.getAllCourses()
        .then((courses) => {
            return res.send({ "courses": courses });
        })
        .catch(err => {
            return res.status(500).send();
        })

});

router.post("/createCourse", VerifyToken, (req, res) => {
    let required_keys = ['courseName', 'courseCredits', 'teacherName'];
    let has_required_keys = hasValuesFor(required_keys, req.body);
    if (has_required_keys) {
        Courses.createCourse(required_keys.map(key => { return req.body[key] }))
            .then(() => {
                return res.status(201).send();
            })
            .catch(() => {
                res.status(500).send();
            });
    }
    else {
        return res.status(400).send("Missing one or more required keys!");
    }
});

router.get("/getStudents", VerifyToken, (req, res) => {
    let required_keys = ['name', 'courseName'];
    if (req.query.by && required_keys.indexOf(req.query.by) !== -1) {
        Student.getStudents(['*'], ` ${req.query.by} LIKE ? `, ['%' + req.query.value + '%'])
            .then(students => {
                return res.send({ "students": students });
            })
            .catch(() => {
                return res.status(500).send();
            })
    }
    else if (!req.query.by) {
        Student.getAllStudents()
            .then(students => {
                return res.send({ "students": students });
            })
            .catch(err => {
                return res.status(500).send();
            })
    }
    else {
        return res.status(400).send("Missing one or more required keys!");
    }
});

router.post("/enrollStudent", VerifyToken, (req, res) => {
    let required_keys = ['name', 'course'];
    let has_required_keys = hasValuesFor(required_keys, req.body);
    if (has_required_keys) {
        Student.enroll(required_keys.map(key => { return req.body[key] }))
            .then(() => {
                res.status(201).send();
            })
            .catch(() => {
                res.status(500).send();
            })
    }
    else {
        res.status(400).send("Missing one or more required parameters!");
    }
})


module.exports = router;