
const express = require("express");
const router = express.Router();
const VerifyToken = require("../auth/VerifyToken");
const db = require("./db");
const CollegeServices = require("../services/College");

const Courses = new CollegeServices.Courses();
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

router.post("/CreateCourse", VerifyToken, (req, res) => {
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
})


module.exports = router;