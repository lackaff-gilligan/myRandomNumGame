var express = require('express');
var router = express.Router();

//randomNumber holds whatever the corresponding module is set to share 
//(in this case it's a function)
var randomNumber = require('../modules/random_number.js'); 

//holds the function checkGuesses from corresponding module
var checkGuesses = require('../modules/check_guesses.js');

//will store each round of guesses
var guessRounds = [];

//will hold maximum number in guessing range (associated with difficulty level picked by users)
var max;

//will hold current game's generated random number that players are trying to guess
var generatedRandomNum;

//will hold each player's guess
// var p1Guess;
// var p2Guess;
// var p3Guess;
// var p4Guess;

//POST ROUTE, http://localhost:5000/number will go here
router.post('/', function(req, res){
    max = parseInt(req.body.max);
    console.log('req.body is now max:', max);
    //call function to generate random number within chosen difficulty range
    generatedRandomNum = randomNumber(max);
    console.log('this round\'s generatedRandomNum', generatedRandomNum);
    
    res.sendStatus(201);
});

//POST ROUTE, http://localhost:5000/number/guesses will go here
router.post('/guesses', function(req, res){
    var playerGuesses = req.body;
    console.log('req.body now playerGuesses:', playerGuesses);
    //store this round of guesses
    guessRounds.push(playerGuesses);
    //assign each player's guess to a variable
    var p1Guess = parseInt(playerGuesses.player1);
    var p2Guess = parseInt(playerGuesses.player2);
    var p3Guess = parseInt(playerGuesses.player3);
    var p4Guess = parseInt(playerGuesses.player4);
    console.log('p3Guess:', p3Guess);
    
    console.log('generatedRandomNum at this point:', generatedRandomNum);
    
    console.log(checkGuesses(generatedRandomNum, p1Guess, p2Guess, p3Guess, p4Guess));
    res.sendStatus(201);
});


module.exports = router;