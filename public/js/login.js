$(document).ready(function() {
  // Getting references to our form and inputs
  var emailInput = $("input#loginEmail");
  var passwordInput = $("input#loginPassword");

  // When the form is submitted, we validate there's an email and password entered
  $("#loginBtn").on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
    // Collapse login form
    $(".collapseLogin").toggleClass("show", false);
  });

  // loginUser does a post to our "api/login" route and if successful, redirects them to their profile page
  function loginUser(email, password) {
    console.log(email + " " + password);
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function(data) {
        window.location.replace(data);
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});
