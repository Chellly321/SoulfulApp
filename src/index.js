import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { firebaseConfig } from "./firebase/config";
import { initializeApp } from "firebase/app";
import AuthContextProvider from "./context/AuthContext";

initializeApp(firebaseConfig);

ReactDOM.render(
  <AuthContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthContextProvider>,

  document.getElementById("root")
);

reportWebVitals();
