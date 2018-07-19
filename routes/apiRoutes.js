var db = require("../models");
var caber = require("caber");
var workoutsApi = {}
module.exports = function(app) {
  // Get all examples
  app.get("/api/workouts", function(req, res) {
    db.Workouts.findAll({}).then(function (workoutData) {
    var workouts = []
        var workout = {
          id: "",
          name: "",
          exercises: []
        }
        workoutData.forEach(function (element) {
          workout.id = parseInt(element.id)
          var exerciseArr = []
          var parsedWorkout = caber.parse(element.workoutString)
          workout.name = parsedWorkout.name
          var iterator = 0
          console.log(parsedWorkout.length)
          for (var j = 0; j < parsedWorkout.length; j++) {
            if (j === 0) {
              workout.name = parsedWorkout[j].name
            }
            else {
              var exInfo = {
                exName: parsedWorkout[j].name,
                sets: parsedWorkout[j].comment
              }
              workout.exercises.push(exInfo)
            }
          }
          workouts.push(workout)
        })
        res.json(workouts)
    });
  })
  // Create a new example
  app.post("/api/workouts", function(req, res) {
    
    db.Workouts.create(req.body).then(function(workout) {
      console.log(workout)
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
