import React from "react";
import ReactDOM, { render } from "react-dom";
import { createGlobalStyle } from "styled-components";

import "bootstrap/dist/css/bootstrap.min.css";
import "emoji-mart/css/emoji-mart.css";

import { App } from "./app";

const GlobalStyles = createGlobalStyle`
.card-header {
  padding: 0.25em 0.5em;
}
.card-body {
  padding: 0.25em 0.5em;
}
.card-text {
  margin: 0;
}
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
