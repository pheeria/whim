import { combineReducers } from "redux";

const keyword = (state = "", action) => {
  switch (action.type) {
    case "SET_KEYWORD":
      return action.payload;
    default:
      return state;
  }
};

const answer = (state = "", action) => {
  switch (action.type) {
    case "DEFINE_ANSWER":
      return action.payload;
    default:
      return state;
  }
};

const options = (state = {}, action) => {
  switch (action.type) {
    case "POPULATE_OPTIONS":
      return action.payload;
    default:
      return state;
  }
};

const highscore = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT_HIGHSCORE":
      return ++state;
    default:
      return state;
  }
};

const reducer = combineReducers({
  keyword,
  answer,
  options,
  highscore
});

export default reducer;
