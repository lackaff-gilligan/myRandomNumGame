var express = require('express');
var app = express();

var port = process.env.PORT || 5000;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

var numberRouter = require('./routes/number_router.js');
app.use('/number', numberRouter);

//share static files in the public folder
app.use(express.static('server/public'));

//start up server
app.listen(port, function(){
    console.log('server running on port:', port);
});