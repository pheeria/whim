const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Whim!");
});

app.listen(4200, () => console.log("Listening on port 4200!"));
