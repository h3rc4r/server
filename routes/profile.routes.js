const router = require("express").Router();
const User = require("../models/User.model");
const Couple = require("../models/Couple.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");


router.put("/edit/:idUser", isAuthenticated, (req, res, next) => {
    const {idUser}=req.params;
    const{couple,avatar}=req.body;
    User.findByIdAndUpdate(idUser, {couple},{avatar}, {new:true})
    .then((result) =>{
      res.json(result);
      
    })
    .catch(err => next(err))
  })


  router.get("/points/:id", 
  // isAuthenticated, 
  (req, res, next)=>{
  let id = req.params.id; 
  User.findById(id)
  .then((data)=>{
    return res.json(data.points)
  })
  .catch((err)=>{
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
    if(data){
      updatedUser.couple.task= data.task
      res.json(updatedUser)
    }
  })
  .catch((err)=>{
  console.log(err)
  })
})

module.exports = router
