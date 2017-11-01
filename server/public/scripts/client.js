console.log('hello from client.js');

$(document).ready(onReady);

//globals
var diffLevel; //will store the difficulty level picked by the users
var max; //will hold the max number of guessing range

function onReady(){
    //page has loaded
    loadSetUp();
    $('.container').on('click', '.difficulty', difficultyLevelPicked);
    $('.container').on('click', '#start', startBtnClicked);

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

//sets and stores difficulty level
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

  function playMode(){
      var $playMode = $('<div id="playMode"></div>');
      $playMode.append('<h2>Difficulty Level: ' + diffLevel + '</h2>');

   
   $('.container').append($playMode);
  }


  //POST request
//  $.ajax({
//      method: 'POST', //type of request
//      url: '/number', //route that I will match on (needs to be same in server.js)
//      data: objToSend
//  }).done(function(response){
//      console.log('response from POST request', response);
//      //normally would call function that makes GET request here...
//  }).fail(function(error){
//      console.log('something went wrong in POST request', error);
     
//  });


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
