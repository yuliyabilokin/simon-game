let gamePattern = [];

const buttonColours = ["red", "yellow", "green", "blue"];

let userClickedPattern = [];

let level = 0;

let started = false;

let canClick = false;

$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  if (!canClick) return;

  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  canClick = false;

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(300)
    .fadeOut(300)
    .fadeIn(300);

  playSound(randomChosenColour);

  setTimeout(function () {
    canClick = true;
  }, 600);
}

function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
    startOver();
  }
}

function gameOver() {
  canClick = false;

  playSound("wrong");
  $("#level-title").text("Game Over, Press Any Key To Restart");
  $(".container .black").css("background-color", "white");

  setTimeout(function () {
    $(".container .black").css("background-color", "rgb(11, 4, 31)");
  }, 200);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
