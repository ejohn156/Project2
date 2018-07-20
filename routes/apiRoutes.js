var db = require("../models");
var caber = require("caber");
var workoutsApi = {};
module.exports = function(app) {
  // Get all examples
  app.get("/api/workouts", function(req, res) {
    db.Workouts.findAll(req.body).then(function(data){
    res.json(data)
    
  })
})
  // Create a new example
  app.post("/api/workouts", function(req, res) {
    db.Workouts.create(req.body).then(function(workout) {
      console.log(workout);
      res.json(workout);
    });
  });

  // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
