var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence(){
  level++;
  $("#level-title").text("Level " + level).fadeOut(100).fadeIn(100);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  loopCounter = 0;
  myLoop()
}

var loopCounter = 0;
function myLoop() {         //  create a loop function
  setTimeout(function() {   //  call a 3s setTimeout when the loop is called
    $("#" + gamePattern[loopCounter]).fadeOut(100).fadeIn(100);
    playSound(gamePattern[loopCounter]);   //  your code here
    loopCounter++;                    //  increment the counter
    if (loopCounter < gamePattern.length) {           //  if the counter < 10, call the loop function
      myLoop();             //  ..  again which will trigger another
    }                       //  ..  setTimeout()
  }, 500)
}

function displayPattern(color){

}

function playSound(name){
  var chosenSound = new Audio("sounds/" + name + ".mp3");
  chosenSound.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(){
  for(var i = 0; i < gamePattern.length; i++){
    if(gamePattern[i] === userClickedPattern[i]){
      continue;
    } else{
      return false;
    }
  }
  return true;
}

function gameOver(){
  $("#level-title").text("GAME OVER. Press any key to restart.");
  $("body").addClass("game-over");
  playSound("wrong");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  level = 0;
}

$(".btn").on("click", function(){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  if(gamePattern.length === userClickedPattern.length){
    if(checkAnswer()){
      userClickedPattern = [];
      setTimeout(nextSequence, 1000);
    } else{
      gameOver();
    }
  }
});

$(document).on("keydown", function(){
    if(started === false){
      $("#level-title").text("Level 0");
      nextSequence();
      started = true;
    }
})
