import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Whim from "./Whim";

const App = () => (
  <Provider store={store}>
    <Whim />
  </Provider>
);

export default App;
