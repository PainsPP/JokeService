const Joke = require('../models/Jokes');
const fetch = require("node-fetch");

exports.createJoke = function (setup, punchline) {
    const  joke = new Joke({
        setup: setup,
        punchline: punchline
    });
    return joke.save();
};

exports.getJoke = function (jokeId) {
    return Joke.findOne({_id: jokeId}).exec;
};

exports.getJokes = function () {
    return Joke.find().populate().exec();
}

exports.getOthersites = function (url) {
    let arr = [];
    fetch.then(response => response.json())
        .then(array => arr = array);
    return arr.exec;
};

