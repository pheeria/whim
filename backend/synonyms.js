const axios = require("axios");

const synonyms = axios.create({
  baseURL: "http://www.stands4.com/services/v2/syno.php",
  timeout: 10000,
  params: {
    uid: process.env.SYNONYMS_UID,
    tokenid: process.env.SYNONYMS_TOKEN,
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
