var db = require("../models");
var caber = require("caber")

module.exports = function (app) {
  // Load index page

  app.get("/", function (req, res) {

    db.Workouts.findAll({}).then(function (workoutData) {

      workoutData.forEach(function (element) {
        element.workoutString = caber.parse(element.workoutString)
      })
      
      res.render("home", { workoutData: workoutData })

    });
  });

  app.get("/workouts/all", function (req, res) {

    db.Workouts.findAll({}).then(function (workoutData) {

      workoutData.forEach(function (element) {
        element.workoutString = caber.parse(element.workoutString)
      })
      console.log(workoutData[0])
      res.render("workoutList", { workoutData: workoutData })

    });
  });

  app.get("/workouts/type/:type", function (req, res) {

    db.Workouts.findAll({where: {
      workoutType : req.params.type
    }}).then(function (workoutData) {

      workoutData.forEach(function (element) {
        element.workoutString = caber.parse(element.workoutString)
      })
      console.log(workoutData[0])
      res.render("workoutList", { workoutData: workoutData })

    });
  });

  app.get("/workouts/name/:name", function (req, res) {

    db.Workouts.findAll({where: {
      workoutName : req.params.name
    }}).then(function (workoutData) {

      workoutData.forEach(function (element) {
        element.workoutString = caber.parse(element.workoutString)
      })
      console.log(workoutData[0])
      res.render("workoutList", { workoutData: workoutData })

    });
  });

  app.get("/workouts/ind/:id", function (req, res) {
    console.log(req.params.id)
    db.Workouts.findAll({where: {
      id : req.params.id
    }}).then(function (workoutData) {

      workoutData.forEach(function (element) {
        element.workoutString = caber.parse(element.workoutString)
      })
      console.log(workoutData.workoutName)
      res.render("indWorkout", { workoutData: workoutData })

    });
  });

  app.get("/profile", function (req, res) {
    res.render("profile");
  })

    app.get("/workouts/create", function (req, res) {
    res.render("createWorkout");
  })

    // Load example page and pass in an example by id
    app.get("/example/:id", function (req, res) {
      db.Example.findOne({ where: { id: req.params.id } }).then(function (
        dbExample
      ) {
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
