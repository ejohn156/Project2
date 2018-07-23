var BMI = require("body-mass-index");


$(".login").hide();
$(".signUp").hide();


$("#createBMI").on("click", function(event) {
  event.preventDefault();
  var height = $("input[name=height]").val().trim();
  console.log(height);
  // var heightIn =
  //   $(".heightIn")
  //     .val()
  //     .trim() + "in";
  // var heightFt =
  //   $(".heightFt")
  //     .val()
  //     .trim() + "ft";
  // var height = heightFt + " " + heightIn;
  // var weight =
  //   $(".weight")
  //     .val()
  //     .trim() + "lb";
  // var bmi = BMI(height, weight);
  // $(".bmiResult").text(bmi);
  bodyMassIndex('200 lb', '6ft 9in');
});



