var express = require('express');
var router = express.Router();
//randomNumber now holds whatever the module is set to share 
//(in this case it's an object that contains a function)
var randomNumber = require('../modules/random_number.js'); 
//will hold maximum number in guessing range
var max;
//will hold each player's guess
var p1Guess;
var p2Guess;
var p3Guess;
var p4Guess;

router.post('/', function(req, res){
    var maxAndGuesses = req.body;
    console.log('req.body now maxAndGuesses:', maxAndGuesses);
    res.sendStatus(201);
});

module.exports = router;