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
  var objToSend = {
      max: max,
      diffLevel: diffLevel
  };
  //POST request
 $.ajax({
     method: 'POST', //type of request
     url: '/number', //route that I will match on
     data: objToSend
 })
}

