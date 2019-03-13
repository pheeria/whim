const axios = require("axios");
const secrets = require("./secrets");

const synonyms = axios.create({
  baseURL: secrets.synonyms.api,
  timeout: 3000,
  params: {
    uid: secrets.synonyms.uid,
    tokenid: secrets.synonyms.token,
    format: "json"
  }
});

module.exports = { synonyms };
