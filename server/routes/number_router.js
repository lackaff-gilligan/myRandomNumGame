var express = require('express');
var router = express.Router();

//randomNumber holds whatever the corresponding module is set to share 
//(in this case it's a function)
var randomNumber = require('../modules/random_number.js'); 

//holds the function checkGuesses from corresponding module
var checkGuesses = require('../modules/check_guesses.js');

//store each round of players' guesses
var guessRounds = [];

//maximum number in current guessing range (associated with difficulty level picked by users)
var max;

//current game's generated random number that players are trying to guess
var generatedRandomNum;

//this round's results (whether or not someone won, each player )
var currentRound;

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
    currentRound = checkGuesses(generatedRandomNum, p1Guess, p2Guess, p3Guess, p4Guess); 
    console.log(currentRound);
    res.sendStatus(201);
});

//GET ROUTE
router.get('/', function(req, res){
    console.log('GET request for guess results was made');
    //send back current round results and all of past round player guesses
    res.send({currentRound: currentRound, guessRounds: guessRounds});
})

module.exports = router;