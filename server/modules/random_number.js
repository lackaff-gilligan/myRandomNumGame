//returns a random number between 1 and the argument it's passed
function randomNumber(maxNum) {
    return Math.floor(Math.random() * maxNum ) + 1;
}


//gives access to this function in other files
module.exports = randomNumber;
