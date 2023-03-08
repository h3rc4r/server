const router = require("express").Router();
const Task = require("../models/Task.model");
const {isAuthenticated} = require("../middleware/jwt.middleware");

router.get("/", isAuthenticated, (req, res, next) => {
    Project.find()
    .populate("tasks")
    .then(response => {
        res.json(response);
    })
    .catch(err => next(err))
});

router.post("/new", isAuthenticated, (req, res, next) => {
    const { title, checked} = req.body;
    taskList.create({ title, checked })
    .then(response => {
        res.json({resultado: "listo"});
    })
    .catch(err => next(err))
});
module.exports = router;
