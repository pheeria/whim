export const setKeyword = keyword => ({
  type: "SET_KEYWORD",
  payload: keyword
});

export const defineAnswer = answer => ({
  type: "DEFINE_KEYWORD",
  payload: answer
});

export const populateOptions = options => ({
  type: "POPULATE_OPTIONS",
  payload: options
});

export const queryNextQuestion = dispatch => {
  fetch().then(question => {
    dispatch(setKeyword(question.keyword));
    dispatch(defineAnswer(question.answer));
    dispatch(populateOptions(question.options));
  });
};

export const incrementHighscore = () => ({
  type: "INCREMENT_HIGHSCORE"
});
