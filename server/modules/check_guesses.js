//compares a given number with four other different numbers, checks if any match
function checkGuesses(randomNum, guess1, guess2, guess3, guess4){
    var gameMsg = 'GUESS AGAIN!';
    var playerMsg;
    var guesses = [guess1, guess2, guess3, guess4];
    var guessResults = [];
    var resultObj = {
        gameMsg: gameMsg,
        guessResults: guessResults
    };
    for (var i = 1; i <= guesses.length; i += 1) {
        if(guesses[i] > randomNum){
          playerMsg = 'Too high';
        } else if(guesses[i] < randomNum){
            playerMsg = 'Too low';
        } else if(guesses[i] === randomNum) {
            playerMsg = 'CORRECT!';
            gameMsg = 'PLAYER ' + i + ' WINS!!!';
        }
        guessResults.push({player: i, playerMsg: playerMsg});
    }
    return resultObj;
}

module.exports = checkGuesses;