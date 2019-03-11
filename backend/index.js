const express = require("express");
const { unsplash } = require("./unsplash");

const app = express();

app.get("/:word", (req, res) => {
  unsplash.get(`search/photos?query=${req.params.word}`).then(response => {
    res.send(response.data);
  });
});

app.listen(4200, () => console.log("Listening on port 4200!"));
