const express = require("express");
const { unsplash } = require("./unsplash");
const fs = require("fs");

const app = express();
let words = [];

fs.readFile("./adjectives.json", (err, data) => {
  if (err) throw err;
  let adjectives = JSON.parse(data);
  words = adjectives.words;
});

app.get("/", (req, res) => {
  let index = Math.floor(Math.random() * words.length) + 1;
  let word = words[index];
  unsplash
    .get(`search/photos?query=${word}&orientation=squarish`)
    .then(response => {
      const imgs = [`<h1>${word}</h1>`];
      response.data.results.forEach(element => {
        imgs.push(`<img src=${element.urls.small} />`);
      });
      res.send(imgs.join(" "));
    });
});

app.get("/:word", (req, res) => {
  unsplash
    .get(`search/photos?query=${req.params.word}&orientation=squarish`)
    .then(response => {
      const imgs = [];
      response.data.results.forEach(element => {
        imgs.push(`<img src=${element.urls.small} />`);
      });
      res.send(imgs.join(" "));
    });
});

app.listen(4200, () => console.log("Listening on port 4200!"));
