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
    $('.container').on('click', '#cancelBtn', reBoot);
    $('.container').on('click', '#restartBtn', reBoot);
}

//loads the setup mode
function loadSetUp(){
    var $setUp = $('<div id="setUp" class="text-center"><h2>Pick a Level, then click START GAME to play!</h2></div>');
    var $easyBtn = $('<button class="btn btn-default difficulty" id="easy" type="button">EASY</button>');
    var $medBtn = $('<button class="btn btn-default difficulty" id="medium" type="button">MEDIUM</button>');
    var $hardBtn = $('<button class="btn btn-default difficulty" id="hard" type="button">HARD</button>');
    var startGame = $('<br><button class="btn btn-success" id="start" type="button">START GAME</button>');
    var $numRange = $('<h3>Number Range: <br><span id="numRange"></span></h3>');
    
    $setUp.append($easyBtn);
    $setUp.append($medBtn);
    $setUp.append($hardBtn);
    $setUp.append(startGame);
    $setUp.append($numRange);
    $('.container').append($setUp);
}

//sets and stores difficulty level and max guess value
function difficultyLevelPicked(){
    diffLevel = $(this).text();
    console.log('diffLevel:', diffLevel);
    if(diffLevel === 'EASY') {
        max = 25;
    } else if(diffLevel === 'MEDIUM') {
        max = 50;
    } else if(diffLevel === 'HARD'){
        max = 100;
    }
    $('#numRange').text('1 to ' + max);
}

function startBtnClicked(){
    var maxNumToSend = {
        max: max
        //diffLevel: diffLevel
    };
    //POST request of max value
    $.ajax({
        method: 'POST',
        url: '/number', //must match the route on the server
        data: maxNumToSend
    }).done(function(response){
        console.log('successful response from POST request /number', response);
        //call function that appends play mode to the DOM
       playMode();
    }).fail(function(error){
        console.log('POST request for /number failed', error);
    })
    //clear the container div of loadSetUp()
    $('.container').empty();
     
  }

  //create play mode of game
  function playMode(){
      var $playMode = $('<div class="text-center" id="playMode"></div>');
      $playMode.append('<h2 id="difficultyDisp">Difficulty Level: ' + diffLevel + '</h2>');
      $playMode.append('<h3 id="guessRange">Number is between 1 and ' + max + '</h3>');
      $playMode.append('<h3>Guesses made: <span id="guessesMade">0</span></h3>');
      $playMode.append('<h2 id="gameMsg">Good Luck!</h2>');
      var playerInputs = createPlayerInputs();
      $playMode.append(playerInputs);
      $playMode.append('<button type="submit" class="btn btn-success" id="submitBtn">Submit Guesses</button>');
      $playMode.append('<button type="button" class="btn btn-danger" id="cancelBtn">Cancel Game</button>');
   $('.container').append($playMode);
  }

  //create inputs and last guess details for each player's guesses
  function createPlayerInputs(){
      var players = $('<div id="players"></div>');
      for(var i = 1; i <= 4; i += 1){
       players.append('<label for="input' + i + '">Player ' + i + '</label><br>');
       players.append('<input type="text" id="input' + i + '" class="playerInput">');
       players.append('<p>Your last guess was: <span id="lastGuess' + i + '"></span></p>');
      }
      return players;
  }

  function submitGuesses(){
      //add 1 to guess tracker
      guessesMade += 1;
      //create object that contains max number and player guesses
      var objToSend = {
          guessesMade: guessesMade,
          player1: $('#input1').val(),
          player2: $('#input2').val(),
          player3: $('#input3').val(),
          player4: $('#input4').val()
      }
      console.log('testing player1 and guessesMade in obj:', objToSend.player1, 'and', objToSend.guessesMade);
      //clear input fields
      $('.playerInput').val('');
      //POST request
      $.ajax({
          method: 'POST',
          url: '/number/guesses/', //will be '/guesses' in corresponding POST route (number_router.js)
          data: objToSend
      }).done(function(response){
          console.log('successful response from POST req /number/guesses/', response);
          //call function for GET request 
          getResults();
      }).fail(function(error){
          console.log('something went wrong in POST req for /number/guesses/', error);
      });
  } //END submitGuesses

  //GET request
  function getResults() {
      $.ajax({
          method: 'GET',
          url: '/number'
      }).done(function(response){
          console.log('successful response from GET req to /number', response);
          //append response to DOM
          appendResults(response);
      }).fail(function(error){
          console.log('something went wrong in GET req to /number', error);
      });
  } //END getResults

  function appendResults(receivedResults) {
      console.log('in appendResults, being passed:', receivedResults);
      //message displayed after guessing round
      var dispMsg = receivedResults.currentRound.gameMsg;
      //array of player's too high/low messages (objects)
      var playerDetails = receivedResults.currentRound.guessResults;
      console.log('playerDetails: ', playerDetails);
      for (var i = 0; i < playerDetails.length; i += 1) {
          $('#lastGuess' + (i + 1)).text(playerDetails[i].playerMsg);
      }
      //update guesses made tracker
      $('#guessesMade').text(guessesMade);
      $('#gameMsg').text(dispMsg);
      if($('#gameMsg').text() !== 'GUESS AGAIN!'){
          $('#players').prepend('<button id="restartBtn" class="btn btn-default">Restart Game</button><br>');
      }
  }//end appendResults
  
  //reset game to setup mode
  function reBoot(){
      $('.container').empty();
      loadSetUp();
  };

