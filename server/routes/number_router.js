var express = require('express');
var router = express.Router();

//router.use() -- what is this? Do I need it? How do I get multiple POSTs going to 
// this same router?? What are the url's? /number, /number/guesses ?????

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
var p1Guess;
var p2Guess;
var p3Guess;
var p4Guess;

//POST ROUTE, http://localhost:5000/number will go here
router.post('/', function(req, res){
    max = req.body.max;
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
    guessRounds.push(playerGuesses);
    p1Guess = playerGuesses.player1;
    p2Guess = playerGuesses.player2;
    p3Guess = playerGuesses.player3;
    p4Guess = playerGuesses.player4;

    res.sendStatus(201);
});


module.exports = router;