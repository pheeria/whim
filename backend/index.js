const express = require("express");
const cors = require("cors");
const { unsplash, getPhotos } = require("./unsplash");
const { getAntonyms } = require("./synonyms");
const fs = require("fs");

const app = express();
app.use(cors());

const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const getRandomNumber = upTo => Math.floor(Math.random() * Math.floor(upTo));
const getRandomWord = (() => {
  let words = [];

  fs.readFile("./adjectives.json", (err, data) => {
    if (err) throw err;
    let adjectives = JSON.parse(data);
    words = adjectives.words;
  });

  return () => {
    let index = getRandomNumber(words.length);
    return words[index];
  };
})();
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

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
    let result = {};
    while (true) {
      const word = getRandomWord();
      console.log(`Selected word: ${word}`);

      const antonyms = await getAntonyms(word);
      console.log(antonyms);

      result = { options: [], keyword: word, answer: 0 };

      const secretPicture = await getPhotos(word);

      if (secretPicture.length) {
        const index = getRandomNumber(secretPicture.length);
        let picture = secretPicture[index];
        result.options.push(picture.link);

        for (let i = 0; i < antonyms.length && result.options.length < 4; i++) {
          const spamPictures = await getPhotos(antonyms[i]);

          for (
            let j = 0;
            j < spamPictures.length && result.options.length < 4;
            j++
          ) {
            let spamPicture = spamPictures[j];
            result.options.push(spamPicture.link);
          }
        }

        if (result.options.length === 4) {
          shuffle(result.options);
          result.answer = result.options.findIndex(o => o === picture.link);
          break;
        }
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
