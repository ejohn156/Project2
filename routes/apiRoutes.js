var db = require("../models");
var passport = require("../config/passport");

var caber = require("caber");
var workoutsApi = {};
module.exports = function(app) {
  // Get all examples
  app.get("/api/workouts", function(req, res) {
    db.Workouts.findAll(req.body).then(function(data) {
      res.json(data);
    });
  });
  // Create a new example
  app.post("/api/workouts", function(req, res) {
    db.Workouts.create(req.body).then(function(workout) {
      console.log(workout);
      res.json(workout);
    });
  });

  app.post("/api/user", function(req, res) {
    db.UserLogin.create(req.body).then(function(user) {
      console.log(user);
      res.json(user);
    });
  });

  // app.post('/',
  //   passport.authenticate('home', {
  //     successRedirect: '/profile',
  //     failureRedirect: '/',
  //     failureFlash: true
  //   })
  // );

  // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
