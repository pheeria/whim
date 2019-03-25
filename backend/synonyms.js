const axios = require("axios");
const secrets = require("./secrets");

const synonyms = axios.create({
  baseURL: secrets.synonyms.api,
  timeout: 10000,
  params: {
    uid: secrets.synonyms.uid,
    tokenid: secrets.synonyms.token,
    format: "json"
  }
});

const getAntonyms = async word => {
  let result = [];
  const response = await synonyms.get(`/?word=${word}`);
  const relatedWords = response.data.result;
  if (relatedWords && relatedWords.length) {
    if (typeof relatedWords[0].antonyms === "string") {
      result = relatedWords[0].antonyms.split(/\W+/);
    }
  }
  return result;
};

module.exports = { synonyms, getAntonyms };
