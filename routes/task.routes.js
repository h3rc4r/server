const router = require("express").Router();
const Task = require("../models/Task.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Couple = require("../models/Couple.model");
const User = require("../models/User.model");

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
  //const { idTask } = req.params;
  const { checked, user,_id } = req.body;
  console.log("Req.body: ", req.body)
  let value = 0;
  // console.log("CHECKED:", checked, "idtask:", idTask,"USERID:", user)
  // console.log(idTask, checked)
  Task.findByIdAndUpdate(
    _id,
    req.body,
    { new: true }
  )
    .then((result) => {
      console.log(result)
      if (result.checked) {
        User.findById(result.user)
        .then(foundUser => {
          console.log(foundUser)
          User.findByIdAndUpdate(foundUser._id, { points: foundUser.points + result.value }, { new: true })
          .then(updatedUser => console.log(updatedUser)).catch(err => console.log(err));
        }).catch(err => console.log(err))
    
      } else {
        console.log("no Check")
        console.log(result.user)
        User.findById(result.user)
        .then(foundUser => {
          console.log(foundUser)
          User.findByIdAndUpdate(foundUser._id, { points: foundUser.points - result.value }, { new: true })
          .then(updatedUser => 
            console.log(updatedUser))
            return Task.findByIdAndUpdate(result._id,{user:null},{new:true})
            .then((data)=>console.log(data))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err))
        
      }
      // return User.findById(user);

      //res.json(result);
    })

    // .then((result)=>{
    //   console.log("console log",result)
  
    //  })
    //   .then((data)=>{
    //     console.log("segundo")
    // return Task.findByIdAndUpdate(id, {task:data._id}, {new:true})
    // .populate("task")
    // })
    .catch((err) => next(err));
});

router.delete("/delete/:idTask", isAuthenticated, (req, res, next) => {
  const { idTask } = req.params;
  Task.findByIdAndDelete(idTask)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => next(err));
});
module.exports = router;
