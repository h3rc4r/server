const router = require("express").Router();
const User = require("../models/User.model");
const Couple = require("../models/Couple.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");


const nuevo_id = User.findOne({ name: userName })
.then(user => {
  const userId = user._id;
  console.log('User ID:', userId);
})
.catch(err => console.error(err));

router.post("/new", isAuthenticated, (req, res, next) => {
  const {users, coupleName, userName } = req.body;

  User.findOne({ name: userName })
.then(user => {
  const userId = user._id;
  console.log('User ID:', userId);
  return userId
})

.then(userId=>{
  Couple.create({$push:{users:user.id,}})
  res.json(userId);




}
  )

  // .then(foundUsers => {
  //   // Crear una instancia de pareja (couple) con los usuarios encontrados
  //   const couple = new Couple({ users: foundUsers, coupleName });
  //   return couple.save();
   
  // })
  
  .then(savedCouple => {
    res.json(savedCouple);
  })
  .catch(err => next(err));
});

router.put("/edit/:idCouple", isAuthenticated, (req, res, next) => {
  const { idCouple } = req.params;
  const { users, coupleName } = req.body;
  Couple.findByIdAndUpdate(idCouple, { users, coupleName }, { new: true })
    .then((result) => {
      res.json(result);

    })
    .catch(err => next(err))
})
module.exports = router