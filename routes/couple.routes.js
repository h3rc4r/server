const router = require("express").Router();
const User = require("../models/User.model");
const Couple = require("../models/Couple.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");


router.post("/new", isAuthenticated, (req, res, next) => {
  const { users, name} = req.body;
  const prueba=User.find(users,{$push: {name:User._id}}, {new:true})
    .then(response => {
      res.json(response)
      
    })

  Couple.create({ prueba }) 
    .then(response => {
      console.log(response)
      res.json(response);
    })
    .catch(err => next(err))
});
// return Project.findByIdAndUpdate(project, { $push: {tasks: response._id} }, {new: true})

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
