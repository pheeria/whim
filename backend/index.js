const express = require("express");
const { unsplash, getPhotos, getThreeRandomPhotos } = require("./unsplash");
const { getAntonyms } = require("./synonyms");
const fs = require("fs");

const app = express();
app.use((req, res, next) => {
  const origin = req.headers.origin;
  res.set("Access-Control-Allow-Origin", origin);
  res.set({
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  });
  res.type("json");
  res.status(200);
  next();
});

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
const shuffle = array => {
  var j, x, i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
};

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
  "/antonyms",
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

app.get(
  "/next",
  asyncHandler(async (req, res) => {
    let result = {};
    while (true) {
      const word = getRandomWord();
      console.log(`Selected word: ${word}`);

      result = { options: [], keyword: word, answer: 0 };

      const secretPictures = await getPhotos(word);

      if (secretPictures.length) {
        const index = getRandomNumber(secretPictures.length);
        let picture = secretPictures[index];
        result.options.push(picture.link);

        const spamPictures = await getThreeRandomPhotos();

        for (
          let j = 0;
          j < spamPictures.length && result.options.length < 4;
          j++
        ) {
          let spamPicture = spamPictures[j];
          result.options.push(spamPicture.link);
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

app.listen(process.env.PORT || 4200, () =>
  console.log("Listening on port 4200!")
);
