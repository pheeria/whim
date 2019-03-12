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

const getRandomWord = () => {
  let index = Math.floor(Math.random() * words.length) + 1;
  return words[index];
};

app.get("/", async (req, res) => {
  const imgs = [];
  while (true) {
    const word = getRandomWord();
    imgs.push(`<h1>${word}</h1>`);
    const fromUnsplash = await unsplash.get(
      `search/photos?query=${word}&orientation=squarish`
    );

    if (fromUnsplash.data.total) {
      fromUnsplash.data.results.forEach(element => {
        imgs.push(
          `<img src="${element.urls.small}" title="By ${element.user.name}"/>`
        );
      });
      res.send(imgs.join(" "));
    }
  }
});

app.get("/:word", (req, res) => {
  unsplash
    .get(`search/photos?query=${req.params.word}&orientation=squarish`)
    .then(response => {
      const imgs = [];
      response.data.results.forEach(element => {
        imgs.push(
          `<img src="${element.urls.small}" title="By ${element.user.name}"/>`
        );
      });
      res.send(imgs.join(" "));
    });
});

app.listen(4200, () => console.log("Listening on port 4200!"));
