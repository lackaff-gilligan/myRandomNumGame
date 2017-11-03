//compares a given number with four other different numbers, checks if any match
function checkGuesses(randomNum, guess1, guess2, guess3, guess4){
    var result;
    if(randomNum === guess1){
        result = 'Player 1 WINS!!!';
    } else if(randomNum === guess2) {
        result = 'Player 2 WINS!!!';
    } else if(randomNum === guess3) {
        result = 'Player 3 WINS!!!';
    } else if(randomNum === guess4) {
        result = 'Player 4 WINS!!!';
    } else {
        result = 'Guess Again!';
    }
    return result;
}

module.exports = checkGuesses;