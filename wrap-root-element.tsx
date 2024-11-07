import React from "react";
import { Provider } from "react-redux";
import { init } from "./src/redux/store";

const { store } = init({});

export default ({ element }) => {
  return (
    <Provider store={store}>
      <>{element}</>
    </Provider>
  );
};
