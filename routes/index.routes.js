const express = require("express");
const router = express.Router();
const cloudinaryConfig = require("../config/cloudinary.config");
const User = require("../models/User.model");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/upload/:idUser", cloudinaryConfig.single("avatar"), (req, res, next) => {
  const { idUser } = req.params;
 
  //const { avatar } = req.body;
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  User.findByIdAndUpdate(idUser, { avatar: req.file.path}, { new: true })
    .then((result) => {
      console.log(req.file.path)
      res.json(result);
    })
    .catch((err) => next(err));
  
  
});



// router.put("/edit/:idUser", isAuthenticated, (req, res, next) => {
//   const {idUser}=req.params;
//   const{couple,avatar}=req.body;
//   User.findByIdAndUpdate(idUser, {couple},{avatar}, {new:true})
//   .then((result) =>{
//     res.json(result);

//   })
//   .catch(err => next(err))
// })

module.exports = router;
