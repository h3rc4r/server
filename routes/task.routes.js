const router = require("express").Router();
const Task = require("../models/Task.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Couple = require("../models/Couple.model")
const User = require("../models/User.model");

router.get("/:coupleId", isAuthenticated, (req, res, next) => {
  const {coupleId}=req.params;
  Couple.findById(coupleId)
  .populate("task")
  .then(response => {
      res.json(response.task)
  })
  .catch(err => next(err));
}),


  router.post("/:coupleId/new", isAuthenticated, (req, res, next) => {
    const {coupleId} = req.params;
    const {tasks, prize, userId} = req.body;
    for(let i =0; i<tasks.length; i++){
      let title =  tasks[i].title
      let value = tasks[i].value
      Task.create({ title, value})
      .then(data => {
         return Couple.findByIdAndUpdate(coupleId, { $push: {task: data._id} }, {new: true})
      })
      .then((data)=>{
        return User.findByIdAndUpdate(userId, { prize}, {new: true})
      })
      .then((data)=>{
       res.json(data) 
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  });

router.put("/edit/:idTask", isAuthenticated, (req, res, next) => {
  const {idTask}=req.params;
  const{checked}=req.body;
  console.log(idTask, checked)
  Task.findByIdAndUpdate(idTask, {checked:checked}, {new:true})
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


