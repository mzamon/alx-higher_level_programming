#!/usr/bin/node

const request = require('request');

const movieID = process.argv[2];

const url = `https://swapi.dev/api/films/${movieID}/`;

request(url, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    const film = JSON.parse(body);
    const characters = film.characters;

    characters.forEach((characterURL) => {
      request(characterURL, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          const character = JSON.parse(body);
          console.log(character.name);
        } else {
          console.log("Error fetching character:", error);
        }
      });
    });
  } else {
    console.log("Error fetching movie:", error);
  }
});
