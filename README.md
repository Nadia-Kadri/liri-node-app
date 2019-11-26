# liri-node-app

## App Name
LIRI

## App Overview
LIRI is a command line node application that takes in user input and gives back information about concerts, songs, and movies. The NPM package axios is used to send requests and retrieve data from the below APIs:
* Bands in Town
* Spotify
* OMDB

In addition to the above technologies, NPM package moment is also being used to format dates.

## App Instructions
To run this app, users should enter one of the following four commands followed by their inquiry.
* concert-this
* spotify-this-song
* movie-this
* do-what-it-says


Once the user enters their inquiry, the respective functions are called and a request is made via axios to the previously mentioned APIs. Once retrieved, the data is then logged to the console. 

Video Demonstration: https://drive.google.com/file/d/1U3LLNbSO3TdHxJrihWUP9hXFMPKzsLvS/view