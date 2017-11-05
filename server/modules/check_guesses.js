//compares a given number with four other different numbers, checks if any match
function checkGuesses(randomNum, guess1, guess2, guess3, guess4){
    var gameMsg = 'GUESS AGAIN!';
    var playerMsg;
    var guesses = [guess1, guess2, guess3, guess4];
    var guessResults = [];
    var resultObj = {};
    for (var i = 0; i < guesses.length; i += 1) {
        if(guesses[i] > randomNum){
          playerMsg = 'Too high';
        } else if(guesses[i] < randomNum){
            playerMsg = 'Too low';
        } else if(guesses[i] === randomNum) {
            playerMsg = 'CORRECT!';
            gameMsg = 'PLAYER ' + (i + 1) + ' WINS!!!';
        }
       //store this player's specific feedback message for their guess this round
        guessResults.push({player: (i + 1), playerMsg: playerMsg});
        console.log('iteration- ', i, ': playerMsg-', playerMsg, 'gameMsg- ', gameMsg, 'guessResults- ', guessResults);
    }
    //update resultObj
    resultObj = {
        gameMsg: gameMsg,
        guessResults: guessResults
    };
    return resultObj;
}

module.exports = checkGuesses;