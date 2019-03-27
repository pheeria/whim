export const setKeyword = keyword => ({
  type: "SET_KEYWORD",
  payload: keyword
});

export const defineAnswer = answer => ({
  type: "DEFINE_ANSWER",
  payload: answer
});

export const populateOptions = options => ({
  type: "POPULATE_OPTIONS",
  payload: options
});

export const queryNextQuestion = () => dispatch => {
  let api = "https://whim-backend.herokuapp.com/next";
  if (process.env.NODE_ENV !== "production") {
    api = "http://localhost:4200/next";
  }
  fetch(api)
    .then(res => res.json())
    .then(question => {
      dispatch(setKeyword(question.keyword));
      dispatch(defineAnswer(question.answer));
      dispatch(populateOptions(question.options));
    });
};

export const incrementHighscore = () => ({
  type: "INCREMENT_HIGHSCORE"
});
