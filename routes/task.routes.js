const router = require("express").Router();
const Task = require("../models/Task.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Couple = require("../models/Couple.model")
const User = require("../models/User.model")

router.get("/", isAuthenticated, (req, res, next) => {
  const {coupleId}=req.query;
  console.log(coupleId)
  Couple.findById(coupleId)
  .populate("task")
  .then(response => {
      res.json(response.task)
  })
  .catch(err => next(err));
}),


  router.post("/:coupleId/new", isAuthenticated, (req, res, next) => {
    const {coupleId} = req.params;
    const { title, value } = req.body;
    Task.create({ title, value})
      .then(response => {
        return response
      })
      .then((data)=>{
        return Couple.findByIdAndUpdate(coupleId, { $push: {task: data} }, {new: true})
      })
      .then((data)=>{
        res.json(data)
      })
      .catch(err => next(err))
  });

router.put("/edit/:idTask", isAuthenticated, (req, res, next) => {
  const {idTask}=req.params;
  const{checked, user}=req.body;
  console.log("CHECKED:", checked, "idtask:", idTask,"USERID:", user)
  console.log(idTask, checked)
  Task.findByIdAndUpdate(idTask, {checked:checked, user:user},{new:true})
  .then((result) =>{
    console.log(result)
    res.json(result);
  })
    .then((data)=>{
  return Task.findByIdAndUpdate(id, {task:data._id}, {new:true})
  .populate("task")
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


