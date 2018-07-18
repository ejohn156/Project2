var db = require("../models");
var caber = require("caber");
module.exports = function(app) {
  // Get all examples
  app.get("/api/workouts", function(req, res) {
    db.Workouts.findAll({}).then(function(data) {
      var workoutsApi = {}
      data.forEach(function(workout){
        workoutsApi += caber.workout(workout)
      })
      res.json(workoutsApi);
    });
  });

  // Create a new example
  app.post("/api/workouts", function(req, res) {
    db.Workouts.create(req.body).then(function(workout) {
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
