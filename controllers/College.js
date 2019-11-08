
const express = require("express");
const router = express.Router();
const VerifyToken = require("../auth/VerifyToken");


router.get("/getCourses", VerifyToken, (req, res) => {

})

module.export = router;