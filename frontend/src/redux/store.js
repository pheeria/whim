import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
import { queryNextQuestion } from "./actions";
import { load, persist } from "./localStorage";

const store = createStore(reducer, load(), applyMiddleware(thunk));

store.subscribe(() => persist(store.getState()));
store.dispatch(queryNextQuestion());

export default store;
