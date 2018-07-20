// show/hide signUp and logIn forms on home
$(".login").click(function () {
  $(".collapseSignUp").toggleClass("show", false);
});
$(".signUp").click(function () {
  $(".collapseLogin").toggleClass("show", false);
});

$(document).ready(function () {
  // Getting references to our form and input
  var nameInput = $("input#name");
  var emailInput = $("input#signUpEmail");
  var passwordInput = $("input#signUpPassword");
  var passwordConfirm = $("input#password2");

  // When the signup button is clicked, we validate the email and password are not blank
  $("#joinButton").on("click", function (event) {
    event.preventDefault();

    // If the first password equals the confirmed password
    if (passwordInput.val().trim() === passwordConfirm.val().trim()) {
      console.log("Confirmed password");
      var userData = {
        name: nameInput.val().trim(),
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };

      // Return if there's not an email or password entered
      if (!userData.email || !userData.password) {
        return;
      }

      // If we have an email and password, run the signUpUser function
      signUpUser(userData.name, userData.email, userData.password);
      nameInput.val("");
      emailInput.val("");
      passwordInput.val("");
      passwordConfirm.val("");
    }
  });

  // Does a post to the signup route. If successful, we are redirected to the Profile page
  // Otherwise we log any errors
  function signUpUser(name, email, password) {
    console.log(name + " " + email + " " + password);
    $.post("/api/signup", {
      name: name,
      email: email,
      password: password
    })
      .then(function (data) {
        window.location.replace(data);
        // If there's an error, handle it by throwing up a boostrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});