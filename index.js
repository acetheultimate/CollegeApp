const db = require("./db");
const express = require("express");
const app = express();
const router = express.Router();
global.__root = __dirname + '/';

const server = app.listen(process.env.APP_PORT, () => {
    console.log("Listening on:", process.env.APP_PORT);
});

// College Controller
const CollegeController = require(__root + 'controllers/College');
app.use('/api/college', CollegeController);


module.exports = app;

