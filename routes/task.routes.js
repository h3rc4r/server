const router = require("express").Router();
const Task = require("../models/Task.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Couple = require("../models/Couple.model")

router.get("/:coupleId", isAuthenticated, (req, res, next) => {
  const {coupleId}=req.params;
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


