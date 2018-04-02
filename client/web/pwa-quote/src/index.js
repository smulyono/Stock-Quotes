import React from "react";
import Dom from "react-dom";
import Header from "./components/header";
import CardLists from "./components/cardLists";

import { AppProvider } from "./context/stockContext";

/* importing styles from `./assets/styles/index.css */
import "./assets/styles/index.less";

// /* Start of javascript */
Dom.render(
  <AppProvider>
    <Header />
    <CardLists />
  </AppProvider>,
  document.getElementById("root")
);

// hot module reload
if (module.hot) {
  module.hot.accept();
}
