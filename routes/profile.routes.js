const router = require("express").Router();
const User = require("../models/User.model");
const Couple = require("../models/Couple.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const {isAdmin}= require("../middleware/admin.middleware");



router.put("/edit/:idUser", isAuthenticated, (req, res, next) => {
  const { idUser } = req.params;
  const { couple, avatar } = req.body;
  User.findByIdAndUpdate(idUser, { couple }, { avatar }, { points: couple.task.value }, { new: true })
    .then((result) => {
      console.log("taskid",)
      res.json(result);

    })
    .catch(err => next(err))
})


router.get("/points/:id",
  // isAuthenticated, 
  (req, res, next) => {
    let id = req.params.id;
    User.findById(id)
      .then((data) => {
        return res.json(data.points)
      })
      .catch((err) => {
        console.log(err)
      })
  })




router.get("/:id", 
isAuthenticated, 
(req, res, next)=>{
  let updatedUser = {}
  let id = req.params.id; 
  User.findById(id)
  .populate("couple")
  .then((data)=>{
    updatedUser = data
    if(data.couple){
      return Couple.findById(data.couple._id).populate("task")
    }else{
      res.json(data)
    }
  })
  .then((data)=>{
    updatedUser.couple.task= data.task
    res.json(updatedUser)
  })
  .catch((err)=>{
  console.log(err)
  })
})

  router.delete("/delete/:id", isAuthenticated, isAdmin, (req, res, next) => {
    const {id}= req.params
   
     User.findByIdAndDelete(id)
     // console.log("taskid..",idTask)
       .then((resultDelete) => {
         res.json(resultDelete);
       })
       .catch((err) => next(err));
   });

module.exports = router
