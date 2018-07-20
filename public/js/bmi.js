
//var BMI = require("body-mass-index")
$(".bmiCalc").on("submit", function (event) {
    console.log("button clicked")
    event.preventDefault()
    var heightIn = $(".heightIn").val().trim() + "in"
    var heightFt = $(".heightFt").val().trim() + "ft"
    var height = heightFt + " " + heightIn
    var weight = $(".weight").val().trim() + "lb"
    //var bmi = BMI(height, weight)
    $(".bmiResult").text("success")
})
