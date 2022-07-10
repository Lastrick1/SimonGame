// Variable declarations
var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = []; // Initially empty
var userPattern = [];
var level = 0;
var gameOver = false;

// Generate random integer between a and b (inclusive)
function randIntBw(a, b) {
  var value = Math.floor((1 + b - a) * Math.random()) + a;
  return value;
}

// Add event handler to buttons for user response
$(".btn").click(function(event) {
  // Check if game has started
  if (level > 0 && gameOver === false) {
    // Get button of user
    var userChosenColour = event.target.id;
    userPattern.push(userChosenColour);
    animateAndSound(userChosenColour);
    console.log(userPattern);

    // Check if most recent button is correct
    var position = userPattern.length - 1;
    var lastColor = userPattern[position];
    var choice = checkAnswer(position, lastColor);

    // Check if wrong, else...
    if (choice === false) {
      var endSound = new Audio("sounds/wrong.mp3");
      endSound.play();
      $("#level-title").text("Game over: " + level)
      gameOver = true;
    } else {
      // Check if at end of the pattern, else...
      if (position === gamePattern.length - 1) {
        setTimeout(function() {
          userPattern = [];
          nextSequence();
        }, 1000);
      } else {
        // Continue to next position

      }
    }
  }
})

// Choose the next color in the pattern
function nextSequence() {
  var newInt = randIntBw(0, 3);
  var randomChosenColour = buttonColours[newInt];

  // Next Level
  level += 1;
  $("#level-title").text("Level " + level)

  // Add color to array
  gamePattern.push(randomChosenColour)
  console.log(gamePattern);

  // Animate through game pattern
  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(function() {
      animateAndSound(gamePattern[i]);
    }, 500 * i);
  }

  // Animate this button and play sound
  //animateAndSound(randomChosenColour);
}

// Animate a button and make sound
function animateAndSound(whichColor) {
  $("#" + whichColor).addClass("pressed");
  var buttonSound = new Audio("sounds/" + whichColor + ".mp3");
  buttonSound.play();
  setTimeout(function() {
    $("#" + whichColor).removeClass("pressed");
  }, 300);
}

// Event handler for game flow, start on any key pressed
$(document).on("keydown", function() {
  if (level === 0) {
    nextSequence();
  }
})

function checkAnswer(pos, color) {
  if (color === gamePattern[pos]) {
    return true;
  } else {
    return false;
  }
}
