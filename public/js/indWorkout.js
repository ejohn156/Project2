$(".workoutRow").click(function(){
    console.log($(".workoutRow").attr("id"))
    location.reload("/workouts/individual/" + $(".workoutRow").attr("id"))
})