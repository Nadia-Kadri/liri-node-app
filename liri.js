require("dotenv").config();

const fs = require("fs");
const axios = require("axios");
const moment = require('moment');
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");

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
  case "do-what-it-says":
      doThis()
      break;
  default:
      console.log(`-------------------------------------------\nPlease enter concert-this, spotify-this-song, or movie-this followed by your query\n-------------------------------------------`);
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
      console.log(`-------------------------------------------\nConcert Venue: ${data[i].venue.name}\nConcert Location: ${data[i].venue.city}, ${data[i].venue.country}\nConcert Date: ${moment(data[i].datetime).format("MM/DD/YYYY")}\n-------------------------------------------`);
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


function searchSong(song) {
  if (!song) {
    song = "Highs & Lows";
  }

  const spotify = new Spotify(keys.spotify);

  spotify.search({ type: "track", query: song, limit: 1 }, function(err, data) {
    if (err) { 
      throw err;
    } else {
        for (let i = 0; i < data.tracks.items.length; i++) {
          let songInfo = data.tracks.items[i];
          console.log(`-------------------------------------------\nArtist(s): ${songInfo.artists[0].name}\nSong Name: ${songInfo.name}\nPreview Link: ${songInfo.preview_url}\nAlbum: ${songInfo.album.name}\n-------------------------------------------`);
      }
    }
  });
}


function searchMovie(movie) {
  if (!movie) {
    movie = "Mr. Nobody";
  }

  let URL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
  axios.get(URL).then(function(response) {

    const data = response.data;

    console.log(`-------------------------------------------\nTitle: ${data.Title}\nRelease Year: ${data.Year}\nIMDB Movie Rating: ${data.imdbRating}\nRotten Tomatoes Movie Rating: ${data.Ratings[1].Value}\nCountry: ${data.Country}\nLanguage: ${data.Language}\nPlot: ${data.Plot}\nActors: ${data.Actors}\n-------------------------------------------`);
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


function doThis() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      throw err;
    } else {
      let randomTxt = data.split(",");

      switch (randomTxt[0]) {
        case "concert-this":
          searchArtist(randomTxt[1]);
          break;
        case "spotify-this-song":
          searchSong(randomTxt[1]);
          break;
        case "movie-this":
          searchMovie(randomTxt[1]);
          break;
        default:
          console.log(`-------------------------------------------\nNot a valid input\n-------------------------------------------`);
          break;
      }
    }
  });
}
