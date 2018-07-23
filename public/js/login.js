$(document).ready(function() {
  // Getting references to our form and inputs
  var emailInput = $("input#loginEmail");
  var passwordInput = $("input#loginPassword");

  // Clears the "incorrect password" msg when clicked
  $("#loginPassword").on("click", function(event) {
    event.preventDefault();
    $("#alert").css("display", "none");
  });

  // If user clicks on "Project Fitness" title they'll go back to home page
  $(".navbar-text").on("click", function(event) {
    event.preventDefault();
    window.location.replace("/");
  });

  // When the form is submitted, we validate there's an email and password entered
  $("#loginBtn").on("click", function(event) {
    event.preventDefault();
    console.log("login button works");
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      alert("Must enter an email and password");
      return;
    }

    // If we have an email and password we run the loginUser function and close the form
    loginUser(userData.email, userData.password);
  });

  // loginUser does a post to our "api/login" route and if successful, redirects them to their profile page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function(data) {
        // If successful, we are redirected to the Profile page
        window.location.replace(data);
      })
      .catch(function(err) {
        // If there's an error, log the error
        console.log(err);
        $("#alert").css("display", "inherit");
        passwordInput.val("");
      });
  }

  // Click functions for profile dropdown
  $(".routes").on("click", function(event) {
    event.preventDefault();
    var route = $(this).attr("href");
    console.log(route);
    location.replace(route);
    
  });
});
