
var buttonColours=["red", "blue", "green", "Yellow"];
var gamePattern=[];
var level= -1;
var started=false;
var userClickedPattern=[];
var audioElement=document.createElement('audio');

// Init Document Keypress Element
$(document).keypress(function(){
  if(!started){
    nextSequence();
    started=true;
  }
});


// Function userClicked decleration
  $(".btn").click(function(event){
  var userChosenColours= this.id;
  // playSound(userChosenColours);
  animatePress(userChosenColours);
  userClickedPattern.push(userChosenColours);
  checkAnswer(userClickedPattern.length-1);
  });


  // Next Sequence Function decleration
  function nextSequence(){
    level++;
    $("#level-title").html("level "+level);
    var randomNumber= Math.round(Math.random()*3);
    var randomChosenColour= buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#"+randomChosenColour).click(function(){
       playSound(randomChosenColour);
     });
  }

function playSound(name){
  audioElement.setAttribute('src','sounds/'+name+'.mp3');
  var playPromise=audioElement.play();
  if(playPromise!==null){
    playPromise.catch(function(){audioElement.play();});
  }
}

function animatePress(currentColours){
  $('#'+currentColours).addClass("pressed");
  setTimeout(function(){$('#'+currentColours).removeClass("pressed")},100);
}

function checkAnswer(currentLevel){
          if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
            setTimeout(nextSequence(),1000);
            }
          else{
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").html("Game Over Press any key to restart");
            startOver();
          }
       }
  function startOver(){
    level=-1;
    gamePattern.length=0;
    started=false;
  }
