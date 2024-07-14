import 'global';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./ReduxStore/Store.js";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SocketContextProvider } from "./Socket/Context/SocketContext.jsx";
const clientId = import.meta.env.VITE_GOOGLEAUTH_CLIENTID;
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clientId}>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <Router>
				 <SocketContextProvider>
          <App />
         </SocketContextProvider>
        </Router>
      </Provider>
    </PersistGate>
  </GoogleOAuthProvider>
);
