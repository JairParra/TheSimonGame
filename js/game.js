//############################################################
// ### GLOBAL ### 
//############################################################

// contains colours to use 
var buttonColors = ["red", "blue", "green", "yellow"]; 

// COntains the sequence of used colours so far 
var gamePattern = []; 

// Contains the pattern of clicked by the user 
var userClickedPattern = []; 

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
  
//############################################################
// ### MAIN FUNCTIONS ### 
//############################################################

function nextSequence() { 
    // generate a random number 0-3 
    var randomIdx = getRandomInt(0,3); 

    // choose a colour with the generated number 
    var chosenColour = buttonColors[randomIdx] ; 

    // add to current sequence of colours  
    gamePattern.push(chosenColour); 

    // select button with the chosen random id and animate
    console.log((" chosen colour: #" + chosenColour)); 
    $("#" + chosenColour).fadeOut(100).fadeIn(100);

    // play the appropriate sound 
    playSound(chosenColour); 
}

//############################################################
// ### SCRIPT PATTERNS ### 
//############################################################

// detect whenever a button is clicked  
$(".btn").click(function (e){
    // obtain the id of the clicked box 
    var userChosenColor = e.target.id; 

    // add the clicked color to the pattern 
    userClickedPattern.push(userChosenColor); 
    console.log("userClickedPattern: " + userClickedPattern); 

    // play sound when the user clicks 
    playSound(userChosenColor); 

    // animate the button 
    animatePress(userChosenColor); 
}); 



// //############################################################
// // ### TESTS ### 
// //############################################################

// // test alert 
// alert("shiet working"); 

// // change title's text  
// $("h1").text("CHANGED!"); 

// //call the function once 
// nextSequence(); 