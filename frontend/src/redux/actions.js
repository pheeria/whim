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
  fetch("https://whim-backend.herokuapp.com/next")
    .then(res => res.json())
    .then(question => {
      console.log(question);
      dispatch(setKeyword(question.keyword));
      dispatch(defineAnswer(question.answer));
      dispatch(populateOptions(question.options));
    });
};

export const incrementHighscore = () => ({
  type: "INCREMENT_HIGHSCORE"
});
