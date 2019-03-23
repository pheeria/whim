import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
import { queryNextQuestion } from "./actions";

const store = createStore(reducer, applyMiddleware(thunk));

store.dispatch(queryNextQuestion());
export default store;
