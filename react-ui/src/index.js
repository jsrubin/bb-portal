import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "./context";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import "./App.css";

import "semantic-ui-less/semantic.less";
import "bootstrap/dist/css/bootstrap.min.css";

/** @type {Element} */
const renderTo = document.querySelector("#root");

/** @type {string} */
const renderMethod = process.env.SSR_ENABLED ? "hydrate" : "render";

const Application = () => (
  <Provider>
    <App />
  </Provider>
);

/** @type {Function} */
const doRender = () => ReactDOM[renderMethod](<Application />, renderTo);

(process.env.NODE_ENV !== "production" &&
  window.requestAnimationFrame(doRender)) ||
  doRender();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
