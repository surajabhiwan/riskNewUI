import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Modal from "react-modal";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

//Google analytics setup
import ReactGA from 'react-ga';
ReactGA.initialize('G-M9T617RX86');
Modal.setAppElement("#root");

//Disable all console.log in production build
if (process.env.NODE_ENV === 'production') {
  console.log = function() {};
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  // </React.StrictMode>
);
serviceWorkerRegistration.register();
reportWebVitals();
