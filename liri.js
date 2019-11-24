// require("dotenv").config();

// var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);

const axios = require("axios");

const fs = require("fs");

const moment = require('moment');

let command = process.argv[2];

let input = process.argv.slice(3).join(" ");

switch (command) {
  case "concert-this":
      searchArtist(input);
      break;
  case "spotify-this-song":
      searchSong(input);
      break;
  case "movie-this":
      searchMovie(input);
      break;
  default:
      console.log("Please type concert-this followed by your query");
      break;
}

function searchArtist(artist) {
  if (!artist) {
    artist = "Coldplay";
  }
  
  let URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
  axios.get(URL).then(function (response) {

    const data = response.data

    for (let i = 0; i < data.length; i++) {
      console.log(`---------------------------------------\nConcert Venue: ${data[i].venue.name}\nConcert Location: ${data[i].venue.city}, ${data[i].venue.country}\nConcert Date/Time: ${moment(data[i].datetime).format("MM/DD/YYYY")}`);
    }
  })
  .catch(function(error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}


function searchMovie(movie) {
  if (!movie) {
    movie = "Mr. Nobody";
  }

  let URL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
  axios.get(URL).then(function(response) {

    const data = response.data;

    console.log(`Title: ${data.Title}\nRelease Year: ${data.Year}\nIMDB Movie Rating: ${data.imdbRating}\nRotten Tomatoes Movie Rating: ${data.Ratings[1].Value}\nCountry: ${data.Country}\nLanguage: ${data.Language}\nPlot: ${data.Plot}\nActors: ${data.Actors}`);
  })
  .catch(function(error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}
