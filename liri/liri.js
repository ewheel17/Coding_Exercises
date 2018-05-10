require("dotenv").config();
var fs = require("fs");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var keys = require("./keys");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var omdb = keys.omdb;

var arg1 = process.argv[2];
var arg2 = process.argv[3];

// Pick the correct action based on the first argument given.
if (arg1 === 'my-tweets') {
    getTweets();
} else if (arg1 === 'spotify-this-song') {
    getSong();
} else if (arg1 === 'movie-this') {
    getMovie();
} else if (arg1 === 'do-what-it-says') {
    getTxt();
} else {
    console.log('Please enter a valid search command.');
    return;
}

// Retrieves and prints the last 20 tweets from my Twitter account.
function getTweets() {
    var name = {screen_name: 'E_Max_Wheeler'};
    client.get('statuses/user_timeline', name, (err, tweets, resp) => {
        if (err) {
            throw err;
        }
        for (i = 0; i < 20; i++) {
            console.log('===============================')
            console.log(`${tweets[i].text}`);
            console.log(`${tweets[i].created_at}`);
            console.log('===============================')
        }
    })
}

// Retrieves the song input from the command line or outputs a default song if no name is given.
function getSong() {
    if (arg2 === undefined) {
        song = {type: 'track', query: "The Sign Ace of Base"};
        spotify.search(song, (err, data) => {
            console.log("============================================")
            console.log(`Artist: ${data.tracks.items[0].album.artists[0].name}`);
            console.log(`Song: ${data.tracks.items[0].name}`);
            console.log(`Preview Link: ${data.tracks.items[0].preview_url}`);
            console.log(`Album: ${data.tracks.items[0].album.name}`);
            console.log("============================================")
        })
    } else {
        var song = {type: 'track', query: arg2};
        spotify.search(song, (err, data) => { 
            console.log("============================================")
            console.log(`Artist: ${data.tracks.items[0].album.artists[0].name}`);
            console.log(`Song: ${data.tracks.items[0].name}`);
            console.log(`Preview Link: ${data.tracks.items[0].preview_url}`);
            console.log(`Album: ${data.tracks.items[0].album.name}`);
            console.log("============================================")
        })
    }
}

// Gets and logs movie info to the console.
function getMovie() {
    var movie = arg2.split(' ').join('+');
    request(`http://www.omdbapi.com/?t=${movie}&y=2012&apikey=${omdb.ID}`, (err, resp, data) => {
        var info = JSON.parse(data);
        console.log(`Title: ${info.Title}`);
        console.log(`Release Year: ${info.Year}`);
        console.log(`IMDB Rating: ${info.imdbRating}`);
        console.log(`Rotten Tomatoes: ${info.Ratings[1]}`);
        console.log(`Country: ${info.Country}`);
        console.log(`Language: ${info.Language}`);
        console.log(`Plot: ${info.Plot}`);
        console.log(`Actors: ${info.Actors}`);
    })
}

// Parses and executes based on information pulled from random.txt rather than direct user input.
function getTxt() {
    fs.readFile('random.txt', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }

        data = data.split(',');
        arg2 = data[1];

        if (data[0] === 'my-tweets') {
            getTweets();
        } else if (data[0] === 'spotify-this-song') {
            getSong();
        } else if (data[0] === 'movie-this') {
            getMovie();
        } else {
            console.log('There was an error. Please make sure the text file is properly formatted.');
        }
    })
}

