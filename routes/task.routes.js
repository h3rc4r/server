const router = require("express").Router();
const Task = require("../models/Task.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Couple = require("../models/Couple.model");
const User = require("../models/User.model");
const {isAdmin}= require("../middleware/admin.middleware");
const { trusted } = require("mongoose");
router.get("/:coupleId", isAuthenticated, (req, res, next) => {
  const { coupleId } = req.params;
  Couple.findById(coupleId)
    .populate("task")
    .then((response) => {
      res.json(response.task);
    })
    .catch((err) => next(err));
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
       console.log("INSIDE TASKS ROUTE") 
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  });

  router.put("/edit/:idTask", isAuthenticated, (req, res, next) => {
    const { idTask } = req.params;
    const { checked, user } = req.body;
    let value = 0;
    Task.findByIdAndUpdate(
      idTask,
      req.body,
      { new: true }
    )
      .then((result) => {
        if (result.checked) {
          User.findById(result.user)
          .then(foundUser => {
            User.findByIdAndUpdate(foundUser._id, { points: foundUser.points + result.value }, { new: true })
            .then(updatedUser =>res.json(updatedUser)).catch(err => console.log(err));
          }).catch(err => console.log(err))
      
        } else {
          User.findById(result.user)
          .then((foundUser) => {
            User.findByIdAndUpdate(foundUser._id, { points: foundUser.points - result.value }, { new: true })
            .then((updatedUser) => {
              return Task.findByIdAndUpdate(result._id,{user:null},{new:true})})
              .then((data)=>console.log(data))
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err))
          
        }
      })
      .catch((err) => next(err));
  });

      //res.json(result);
    // })

    // .then((result)=>{
    //   console.log("console log",result)
  
    //  })
    //   .then((data)=>{
    //     console.log("segundo")
    // return Task.findByIdAndUpdate(id, {task:data._id}, {new:true})
    // .populate("task")
    // })
//     .catch((err) => next(err));
// });

router.delete("/delete/:idTask", isAuthenticated, isAdmin, (req, res, next) => {
 const {idTask}= req.params

  Task.findByIdAndDelete(idTask)
  // console.log("taskid..",idTask)
    .then((resultDelete) => {
      res.json(resultDelete);
    })
    .catch((err) => next(err));
});

module.exports = router;
