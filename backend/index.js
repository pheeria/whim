const express = require("express");
const cors = require("cors");
const { unsplash } = require("./unsplash");
const { synonyms } = require("./synonyms");
const fs = require("fs");

const app = express();
app.use(cors());

const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const getRandomWord = (() => {
  let words = [];

  fs.readFile("./adjectives.json", (err, data) => {
    if (err) throw err;
    let adjectives = JSON.parse(data);
    words = adjectives.words;
  });

  return () => {
    let index = Math.floor(Math.random() * words.length) + 1;
    return words[index];
  };
})();

app.get(
  "/",
  asyncHandler(async (req, res) => {
    const imgs = [];
    while (true) {
      const word = getRandomWord();
      imgs.push(`<h1>${word}</h1>`);
      const fromUnsplash = await unsplash.get(`search/photos?query=${word}`);

      if (fromUnsplash.data.total) {
        fromUnsplash.data.results.forEach(element => {
          imgs.push(
            `<img src="${element.urls.small}" title="By ${element.user.name}"/>`
          );
        });
        res.send(imgs.join(" "));
      }
    }
  })
);

app.get(
  "/next",
  asyncHandler(async (req, res) => {
    const result = { options: [], keyword: "", answer: "" };
    while (true) {
      const word = getRandomWord();
      console.log(`Selected word: ${word}`);

      const relatedWords = await synonyms.get(`/?word=${word}`);
      if (relatedWords.data.result.length) {
        const antonyms = relatedWords.data.result[0].antonyms.split(/\W+/);
        console.log(antonyms);
      }

      result.keyword = word;
      result.answer = 0;
      const fromUnsplash = await unsplash.get(`search/photos?query=${word}`);

      if (fromUnsplash.data.total > 3) {
        for (let i = 0; i < 4; i++) {
          let picture = fromUnsplash.data.results[i];
          result.options.push(picture.urls.small);
        }
        break;
      }
    }
    res.send(result);
  })
);

app.get("/:word", (req, res) => {
  unsplash.get(`search/photos?query=${req.params.word}`).then(response => {
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
