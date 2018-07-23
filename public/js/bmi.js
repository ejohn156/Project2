var BMI = require("body-mass-index");
$(".calculate").on("click", function(event) {
  event.preventDefault();
  console.log("ok");
  var heightIn =
    $(".heightIn")
      .val()
      .trim() + "in";
  var heightFt =
    $(".heightFt")
      .val()
      .trim() + "ft";
  var height = heightFt + " " + heightIn;
  var weight =
    $(".weight")
      .val()
      .trim() + "lb";
  var bmi = BMI(height, weight);
  console.log(bmi);
  $(".bmiResult").text(bmi);
});
