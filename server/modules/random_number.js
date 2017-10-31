function randomNumber(max) {
    return Math.floor(Math.random() * max ) + 1;
}

module.exports = {
    randomNumber: randomNumber
};
