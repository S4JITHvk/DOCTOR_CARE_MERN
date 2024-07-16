import 'global';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./ReduxStore/Store.js";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SocketContextProvider } from "./Socket/Context/SocketContext.jsx";

const clientId = import.meta.env.VITE_GOOGLEAUTH_CLIENTID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clientId}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </Router>
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>
);
