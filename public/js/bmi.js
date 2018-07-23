


$(document).ready(function() {

  var inches = $(".inches");
  var feet = $(".feet");
  var weight = $(".weight");

  $("#userCalcForm").on("submit", function(event) {
    event.preventDefault();

    var userData = {
      inches: inches.val().trim(),
      feet: feet.val().trim(),
      weight: weight.val().trim()
    };

    calculateBMI(userData.inches, userData.feet, userData.weight);
    inches.val("");
    feet.val("");
    weight.val("");
  });

  // Function to calculate BMI
  function calculateBMI(inches, feet, weight) {
    
    $.ajax({
      method: "PUT",
      url: "/api/member",
      data: {
        inches: inches,
        feet: feet,
        weight: weight
      }
     })
      .then(function(data) {
        // console.log(data);
      });

  }


});