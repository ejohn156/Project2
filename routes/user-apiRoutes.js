// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var BMI = require("body-mass-index");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the profile page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the profile page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    //console.log(req.body);

    res.json("/profile");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/member", function(req, res) {
    //console.log(req.body);
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
      .then(function(userData) {
        //console.log(userData);
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
  });

  // Update Route
  app.put("/api/member", function(req, res) {
    //BMI Calculatiom
    var inches = req.body.inches + "in";
    var feet = req.body.feet + "ft";
    var height = feet + " " + inches;
    var weight = req.body.weight + "lb";
    var bmindex = BMI(weight, height);
    console.log(bmindex);

    db.User.update(
      {
        inches: req.body.inches,
        feet: req.body.feet,
        weight: req.body.weight,
        bmindex: bmindex
      },
      {
        where: {
          id: req.user.id
        }
      }
    ).then(function(data) {
      console.log(data);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        name: req.body.name,
        email: req.body.email,
        id: req.body.id,
        bmi: req.body.bmindex,
        feet: req.body.feet,
        inches: req.body.inches,
        weight: req.body.weight
      });
    }
  });
};
