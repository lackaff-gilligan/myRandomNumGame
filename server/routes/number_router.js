var express = require('express');
var router = express.Router();
//randomNumber now holds whatever the module is set to share 
//(in this case it's an object)
var randomNumber = require('../modules/random_number.js'); 
//will hold maximum number in guessing range
var max;

router.post('/', function(req, res){
    var max = req.body;
    console.log('req.body now max:', max);
    res.sendStatus(201);
})

module.exports = router;