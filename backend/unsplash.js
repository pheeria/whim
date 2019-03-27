const axios = require("axios");

const unsplash = axios.create({
  baseURL: "https://api.unsplash.com",
  timeout: 10000,
  params: {
    orientation: "squarish"
  },
  headers: { Authorization: `Client-ID ${process.env.UNSPLASH_APPID}` }
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
