const router = require("express").Router();
const Task = require("../models/Task.model");
const {isAuthenticated} = require("../middleware/jwt.middleware");

router.post("/new", isAuthenticated, (req, res, next) => {
  const { title, checked } = req.body;
  Task.create({ title, checked })
  .then(response => { 
    return Task.findByIdAndUpdate(project, { $push: {tasks: response._id} }, {new: true})
  })
  .then(response => {
    res.json(response);
  })
  .catch(err => next(err))
});

module.exports = router;
