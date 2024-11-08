import React from "react";
import { Provider } from "react-redux";
import { init } from "./src/redux/store";

export default ({ element }) => {
  const { store } = init({});
  return (
    <Provider store={store}>
      <>{element}</>
    </Provider>
  );
};
