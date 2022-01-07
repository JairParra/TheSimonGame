//############################################################
// ### GLOBAL ### 
//############################################################

// contains colours to use 
var buttonColors = ["red", "blue", "green", "yellow"]; 

// COntains the sequence of used colours so far 
var gamePattern = []; 

// Contains the pattern of clicked by the user 
var userClickedPattern = []; 

// game variables  
var gameStarted = false; // keeps track of whether game has started 
var level = 0; // current game level 
var curIndex = 0; // used to know at which move (index) the player is

//############################################################
// ### HELPERS ### 
//############################################################

function getRandomInt(min, max) {
    // generate and return a random int within bounds
    return Math.floor(Math.random() * (max - min) + min);
}

// plays a given sound from the sound folder  
function playSound(soundName){  
    // fetch the audio for the colour that was pressed  
    var audio = new Audio("sounds/" + soundName + ".mp3"); 
    audio.play(); 
}

// function to animate the pressing 
function animatePress(currentColor){  

    // add animeated class to button that gets pressed 
    $("#" + currentColor).addClass("pressed"); 

    // remove it after 100ms 
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed"); 
    }, 100);
}

// to update level H1 everytime 
function updateLevel(){ 
    //increase current level 
    level += 1;  

    // change h1 title to current level
    $("h1").text("Level " + level);
}
  
//############################################################
// ### MAIN FUNCTIONS ### 
//############################################################

function nextSequence() { 
    // generate a random number 0-3 
    var randomIdx = getRandomInt(0,4); 

    // choose a colour with the generated number 
    var chosenColour = buttonColors[randomIdx] ; 

    // add to current sequence of colours  
    gamePattern.push(chosenColour); 

    // select button with the chosen random id and animate
    console.log(("game colour: #" + chosenColour)); 
    $("#" + chosenColour).fadeOut(100).fadeIn(100);

    // play the appropriate sound 
    playSound(chosenColour); 

    // increase level  & update h1 
    updateLevel();  

    // restart player's sequence array 
    userClickedPattern = []; 
}

// restarts game's array and parameters
function restartGame(){ 
    gamePattern = []; 
    userClickedPattern = []; 
    level = 0; 
    curIndex = 0; 
    gameStarted = false; 
}

// checks whether current input sequence is correct 
function checkAnswer(){ 
    /**
     * Logic: 
     * Everytime the answer is checked, two things should be checked: 
     * - the current player's pattern matches the game pattern so far 
     * - if the player fails the sequence, Game Over. 
     * - if the player has matched the pattern, call next sequence
     * - player clickedSequence has to restart 
     */

    // check that pattern is the same
    var sameColor = gamePattern[curIndex] == userClickedPattern[curIndex] 
    
    // if color is the same, increase index 
    if (sameColor){ 
        // increase index 
        curIndex++; 

         // if index is equal to gamepattern lenght
        if (curIndex === gamePattern.length){ 
            curIndex = 0; // restart index
            console.log("Success! --> Next level"); 

            // call next sequence
            setTimeout(() => {
                nextSequence(); 
            }, 1000);
        }

    }
    else{ 
        // add wrong choice red background
        $("body").addClass("red"); 
        
        // remove it after 100ms 
        setTimeout(() => {
            $("body").removeClass("red"); 
        }, 200);

        // change title 
        $("h1").text("Game Over. \nPress any key to restart."); 
        console.log("Failure!"); 

        // restart game counters and parameters
        restartGame(); 
    }

}

//############################################################
// ### SCRIPT FLOW ### 
//############################################################

// detect whenever a button is clicked  
$(".btn").click(function (e){
    // obtain the id of the clicked box 
    var userChosenColor = e.target.id; 

    // add the clicked color to the pattern 
    userClickedPattern.push(userChosenColor); 

    // play sound when the user clicks 
    playSound(userChosenColor); 

    // animate the button 
    animatePress(userChosenColor); 

    // call the check answer when the user has clicked (last index)
    checkAnswer(); 
}); 


// detect when a keyboard key has been pressed to start the game 
$(document).on("keypress",  function(e) {
    // trigger only at the beginning of the game 
    if (!gameStarted) {
        // update the next sequence
        nextSequence(); 

        // game has already started 
        gameStarted = true; 
    }
    else{ 
        console.log("Game has already started"); 
    }
});
