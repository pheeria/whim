export const load = () => {
  try {
    const state = localStorage.getItem("redux");
    if (state === null) {
      return undefined;
    }
    return JSON.parse(state);
  } catch (err) {
    return undefined;
  }
};

export const persist = state => {
  try {
    const json = JSON.stringify(state);
    localStorage.setItem("redux", json);
  } catch (err) {
    console.log(err);
  }
};
