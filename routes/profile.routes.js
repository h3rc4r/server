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


router.get("/:id", isAuthenticated, (req, res, next)=>{
let id = req.params.id; 
User.findById(id)
.then((data)=>{
  res.json(data);
})
.catch((err)=>{
  console.log(err)
})
})

module.exports = router
