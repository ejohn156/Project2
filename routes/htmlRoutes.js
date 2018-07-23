var db = require("../models");
var caber = require("caber");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Load index page

  app.get("/", function(req, res) {
    db.Workouts.findAll({}).then(function(workoutData) {
      workoutData.forEach(function(element) {
        element.workoutString = caber.parse(element.workoutString);
      });

      res.render("home", { workoutData: workoutData });
    });
  });

  app.get("/profile", function(req, res) {
    var firstName = req.user.name.split(" ", 1);

    var user = {
      userName: firstName,
      email: req.user.email
    };
    res.render("profile", user);
  });

  app.get("/workouts/all", function(req, res) {
    db.Workouts.findAll({}).then(function(workoutData) {
      workoutData.forEach(function(element) {
        element.workoutString = caber.parse(element.workoutString);
      });
      res.render("workoutList", { workoutData: workoutData });
    });
  });

  app.get("/workouts/type/:type", function(req, res) {
    db.Workouts.findAll({
      where: {
        workoutType: req.params.type
      }
    }).then(function(workoutData) {
      workoutData.forEach(function(element) {
        element.workoutString = caber.parse(element.workoutString);
      });
      console.log(workoutData[0]);
      res.render("workoutList", { workoutData: workoutData });
    });
  });

  app.get("/workouts/creator/:creator", function(req, res) {
    db.Workouts.findAll({
      where: {
        creator: req.params.creator
      }
    }).then(function(workoutData) {
      workoutData.forEach(function(element) {
        element.workoutString = caber.parse(element.workoutString);
      });
      console.log(workoutData[0]);
      res.render("workoutList", { workoutData: workoutData });
    });
  });

  app.get("/workouts/name/:name", function(req, res) {
    db.Workouts.findAll({
      where: {
        workoutName: req.params.name
      }
    }).then(function(workoutData) {
      workoutData.forEach(function(element) {
        element.workoutString = caber.parse(element.workoutString);
      });
      console.log(workoutData[0]);
      res.render("workoutList", { workoutData: workoutData });
    });
  });
  app.get("/workouts/ind/:id", function(req, res) {
    console.log(req.params.id);
    db.Workouts.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(workoutData) {
      workoutData.workoutString = caber.parse(workoutData.workoutString);

      console.log(workoutData.workoutName);
      res.render("indWorkout", { workoutData: workoutData });
    });
  });

  app.get("/profile/workouts/create", function(req, res) {
    var user = { name: req.user.name };
    console.log(user.name);
    res.render("createWorkout", user);
  });

  app.get("/profile/workouts/all", function(req, res) {
    db.Workouts.findAll({}).then(function(workoutData) {
      workoutData.forEach(function(element) {
        element.workoutString = caber.parse(element.workoutString);
      });
      res.render("workoutList", { workoutData: workoutData });
    });
  });

  app.get("/bmi", function(req, res) {
    console.log(req.user.bmindex);
    var firstName = req.user.name.split(" ", 1);
    var user = {
      userName: firstName,
      email: req.user.email,
      bmi: req.user.bmindex
    };
    res.render("bmi", user);
  });


  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/profile", isAuthenticated, function(req, res) {
    res.sendFile("/");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
