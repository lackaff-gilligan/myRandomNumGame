var express = require('express');
var router = express.Router();

//checkGuesses holds whatever the module is set to share 
//(in this case it's an object that contains two functions)
var checkGuesses = require('../modules/check_guesses.js'); 
//first function from check_guesses module
var randomNumber = checkGuesses.randomNumber;
//second function from check_guesses module
var compareGuesses = checkGuesses.compareGuesses;

//will store each round of guesses
var guessRounds = [];
//will hold maximum number in guessing range
var max;
//will hold each player's guess
var p1Guess;
var p2Guess;
var p3Guess;
var p4Guess;

//POST ROUTE
router.post('/', function(req, res){
    var maxAndGuesses = req.body;
    console.log('req.body now maxAndGuesses:', maxAndGuesses);
    guessRounds.push(maxAndGuesses);
    max = maxAndGuesses.max;
    p1Guess = maxAndGuesses.player1;
    p2Guess = maxAndGuesses.player2;
    p3Guess = maxAndGuesses.player3;
    p4Guess = maxAndGuesses.player4;
    res.sendStatus(201);
});

//call function to generate random number in given difficulty range


module.exports = router;