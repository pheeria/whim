const axios = require("axios");
const secrets = require("./secrets");

const unsplash = axios.create({
  baseURL: secrets.unsplash.api,
  timeout: 3000,
  headers: { Authorization: `Client-ID ${secrets.unsplash.appId}` }
});

module.exports = { unsplash };
