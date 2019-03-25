const axios = require("axios");
const secrets = require("./secrets");

const unsplash = axios.create({
  baseURL: secrets.unsplash.api,
  timeout: 10000,
  params: {
    orientation: "squarish"
  },
  headers: { Authorization: `Client-ID ${secrets.unsplash.appId}` }
});

const getPhotos = async word => {
  let result = [];
  const fromUnsplash = await unsplash.get(`search/photos?query=${word}`);
  for (let i = 0; i < fromUnsplash.data.results.length; i++) {
    let picture = fromUnsplash.data.results[i];
    result.push({
      link: picture.urls.small,
      author: picture.user.name
    });
  }
  return result;
};

const getThreeRandomPhotos = async () => {
  let result = [];
  const fromUnsplash = await unsplash.get(`/photos/random?count=3`);
  console.log(fromUnsplash.data);
  for (let i = 0; i < fromUnsplash.data.length; i++) {
    let picture = fromUnsplash.data[i];
    result.push({
      link: picture.urls.small,
      author: picture.user.name
    });
  }
  return result;
};

module.exports = { unsplash, getPhotos, getThreeRandomPhotos };
