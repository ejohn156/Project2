$(document).ready(function() {
  var inches = $(".inches");
  var feet = $(".feet");
  var weight = $(".weight");

  $(".calculate").on("click", function(event) {
    event.preventDefault();
    // BMI calculation on front end
    var height = parseInt(inches.val().trim()) + parseInt(feet.val().trim() * 12);
    var secondWeight = parseInt(weight.val().trim());
    var bmi = secondWeight / Math.pow(height, 2) * 703;
    var newBmi = $("<h4>");
    newBmi.append(bmi.toFixed(2));
    $(".bmiResult").append(newBmi);

    var userData = {
      inches: inches.val().trim(),
      feet: feet.val().trim(),
      weight: weight.val().trim()
    };
    console.log(userData);
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
    }).then(function(data) {
      // console.log(data);
    });
  }
});
