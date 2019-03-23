import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import WhimContainer from "./WhimContainer";

const App = () => (
  <Provider store={store}>
    <WhimContainer />
  </Provider>
);

export default App;
