var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;

//User sequence
$(".btn").click(function () {
  //Store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");
  //Add user clicked color to userClickedPattern arry
  userClickedPattern.push(userChosenColour);

  //play user chosen button
  playSound(userChosenColour);

  //Add pressed class to the button that gets clicked inside animatePress().
  $("#" + userChosenColour).addClass("pressed");

  //Remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + userChosenColour).removeClass("pressed");
  }, 100);

  console.log(userClickedPattern.length - 1);
  checkAnswer(userClickedPattern.length - 1);
});

//Play chosen color sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Start the game
$(document).keydown(function () {
  nextSequence();
});

//Check user answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      //  Start next level sequence
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    //Game over

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    //Game over style efect
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    //Change title to game over
    $("h1").text("Game Over, Press Any Key to Restart");

    //Reset the game
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
//Game sequence
function nextSequence() {
  //Reset user arry
  userClickedPattern = [];

  //Chose number between 0-3;
  var randomNumber = Math.floor(Math.random() * 4);

  //Choose random color
  var randomChosenColour = buttonColours[randomNumber];

  //Add chosen color to game patern arry
  gamePattern.push(randomChosenColour);

  //Show the chosen button by is ID with flash efect
  $("#" + randomChosenColour)
    .delay(100)
    .fadeIn(300)
    .fadeOut(300)
    .fadeIn(300);
  //plsy game chosen button sound
  playSound(randomChosenColour);

  //Updating level number

  //Update game title
  $("h1").text("Level " + level);
  level++;
}
