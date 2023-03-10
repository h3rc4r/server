const router = require("express").Router();
const User = require("../models/User.model");
const Couple = require("../models/Couple.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");


// const nuevo_id = User.findOne({ name: userName })
// .then(user => {
//   const userId = user._id;
//   console.log('User ID:', userId);
// })
// .catch(err => console.error(err));

router.post("/new", isAuthenticated, (req, res, next) => {
  const {id, coupleName, userName } = req.body;
  User.findOne({ name: userName })
  .then(user => {
  return Couple.create({users:[id, user._id], coupleName})
  })
  .then((data)=>{
  res.json(data);
  return User.findByIdAndUpdate(id, {couple:data._id}, {new:true})
  .populate("couple")
  })
  .then((data)=>{
    return User.findByIdAndUpdate(data.couple.users[1], {couple: data.couple._id}, {new:true})
  })
  .then((data)=>{
    console.log(data)
  })
  .catch(err => next(err));
});

module.exports = router