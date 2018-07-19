var db = require("../models");
var caber = require("caber")

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Workouts.findAll({}).then(function (workoutData) {
        var workouts = []
        var workout = {
          name: "",
          exercises: []
        }
        workoutData.forEach(function (element) {
          var exerciseArr = []
          var parsedWorkout = caber.parse(element.workoutString)
          workout.name = parsedWorkout.name
          var iterator = 0
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
        res.render("home", {
  
          workouts: workouts
        
        });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
