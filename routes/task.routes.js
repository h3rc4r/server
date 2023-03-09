const router = require("express").Router();
const Task = require("../models/Task.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/", isAuthenticated, (req, res, next) => {
  Task.find()
    .populate("title")
    .then(response => {
      res.json(response)
    })
    .catch(err => next(err));
}),


  router.post("/new", isAuthenticated, (req, res, next) => {
    const { title } = req.body;
    Task.create({ title })
      .then(response => {
        res.json(response);
      })
      .catch(err => next(err))
  });
router.put("/edit/:idTask", isAuthenticated, (req, res, next) => {
  const {idTask}=req.params;
  const{title, value}=req.body;
  Task.findByIdAndUpdate(idTask, {title, value}, {new:true})
  .then((result) =>{
    res.json(result);
    
  })
  .catch(err => next(err))
})
router.delete("/delete/:idTask", isAuthenticated, (req, res, next) => {
  const {idTask} = req.params;
  Task.findByIdAndDelete(idTask)
  .then(response => {
      res.json(response);
  })
  .catch(err => next(err))
});
module.exports = router;


