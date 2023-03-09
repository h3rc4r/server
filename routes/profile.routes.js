const router = require("express").Router();
const User = require("../models/User.model");
const Couple = require("../models/Couple.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.put("/edit/:idUser", isAuthenticated, (req, res, next) => {
    const {idUser}=req.params;
    const{couple}=req.body;
    User.findByIdAndUpdate(idUser, {couple}, {new:true})
    .then((result) =>{
      res.json(result);
      
    })
    .catch(err => next(err))
  })
module.exports = router