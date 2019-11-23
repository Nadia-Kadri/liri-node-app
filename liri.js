// require("dotenv").config();

// var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);


// var command = process.argv[2];

// switch (command) {
//     case "concert-this":
//       break;
    
//     case "spotify-this-song":
//       break;
    
//     case "movie-this":
//       break;
    
//     case "do-what-it-says":
//       break;
//     }


// Basic Node application for requesting data from the OMDB website via axios
// Here we incorporate the "axios" npm package
var axios = require("axios");

// We then run the request with axios module on a URL with a JSON
axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
  function(response) {
    // Then we print out the imdbRating
    console.log("The movie's rating is: " + response.data.imdbRating);
  }
);