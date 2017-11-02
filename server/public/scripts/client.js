console.log('hello from client.js');

$(document).ready(onReady);

//globals
var diffLevel; //will store the difficulty level picked by the users
var max; //will hold the max number of guessing range
var guessesMade = 0; //keeps track of guessing rounds

function onReady(){
    //page has loaded
    loadSetUp();
    $('.container').on('click', '.difficulty', difficultyLevelPicked);
    $('.container').on('click', '#start', startBtnClicked);
    $('.container').on('click', '#submitBtn', submitGuesses);
}

//loads the setup mode
function loadSetUp(){
    var $setUp = $('<div id="setUp"><p>Pick a Level, then click Start to Play!</p></div>');
    var $easyBtn = $('<button class="difficulty" id="easy" type="button">EASY</button>');
    var $medBtn = $('<button class="difficulty" id="medium" type="button">MEDIUM</button>');
    var $hardBtn = $('<button class="difficulty" id="hard" type="button">HARD</button>');
    var startGame = $('<button id="start" type="button">START GAME</button>');
    $setUp.append($easyBtn);
    $setUp.append($medBtn);
    $setUp.append($hardBtn);
    $setUp.append(startGame);
    $('.container').append($setUp);
}

//sets and stores difficulty level and max guess value
function difficultyLevelPicked(){
    diffLevel = $(this).attr('id');
    console.log('diffLevel:', diffLevel);
    if(diffLevel === 'easy') {
        max = 10;
    } else if(diffLevel === 'medium') {
        max = 25;
    } else if(diffLevel === 'hard'){
        max = 40;
    }
}

function startBtnClicked(){
    //clear the container div of loadSetUp()
    $('.container').empty();
    //call function that appends play mode to the DOM
    playMode();
  }

  //create play mode of game
  function playMode(){
      var $playMode = $('<div id="playMode"></div>');
      $playMode.append('<h2 id="difficultyDisp">Difficulty Level: ' + diffLevel + '</h2>');
      $playMode.append('<h3 id="guessRange">Number is between 1 and ' + max + '</h3>');
      $playMode.append('<h3>Guesses made: ' + guessesMade + '</h3>');
      var playerInputs = createPlayerInputs();
      $playMode.append(playerInputs);
      $playMode.append('<button type="submit" id="submitBtn">Submit Guesses</button>');
      $playMode.append('<button type="button" id="cancelBtn">Cancel Game</button>');
   $('.container').append($playMode);
  }

  //create inputs and last guess details for each player's guesses
  function createPlayerInputs(){
      var players = $('<div id="players"></div>');
      for(var i = 1; i < 5; i += 1){
       players.append('<label for="input' + i + '">Player ' + i + '</label><br>');
       players.append('<input type="text" id="input' + i + '" class="playerInput">');
       players.append('<p>Last Guess: <span id="lastGuess' + i + '"></span></p>');
      }
      return players;
  }

  function submitGuesses(){
      //create object that contains max number and player guesses
      var objToSend = {
          max: max,
          player1: parseInt($('#input1').val()),
          player2: parseInt($('#input2').val()),
          player3: parseInt($('#input3').val()),
          player4: parseInt($('#input4').val())
      }
      console.log('testing player1 in obj:', objToSend.player1, 'and', objToSend.max);
      //clear input fields
      $('.playerInput').val('');
      //POST request
      $.ajax({
          method: 'POST',
          url: '/number', //the route that I will match on (needs to be same as the require's corresponding app.use in server.js)
          data: objToSend
      }).done(function(response){
          console.log('response from POST req:', response);
          //will call function for GET request here
      }).fail(function(error){
          console.log('something went wrong in POST req:', error);
      });
  } //END submitGuesses

//GET request
// $.ajax({
//     method: 'GET',
//     url: '/number'
// }).done(function(response){
//     console.log('SUCCESS');
//     console.log(response);
//     //append products to the DOM???
    
// }).fail(function(error){
//     console.log('something went wrong in GET request', error);
    
// });
