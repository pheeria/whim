import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
import { queryNextQuestion } from "./actions";
import { load, persist } from "./localStorage";

const initialState = load();
const store = createStore(reducer, initialState, applyMiddleware(thunk));

store.subscribe(() => {
  const state = store.getState();
  console.log(state);
  persist(state);
});

if (!initialState) {
  store.dispatch(queryNextQuestion());
}

export default store;
