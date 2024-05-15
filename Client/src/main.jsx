import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './ReduxStore/Store.js';
import { GoogleOAuthProvider } from '@react-oauth/google'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="893118787246-uabbv2fravur6ghegudajvckm2km2enb.apps.googleusercontent.com">
    <Provider store={store}> 
      <Router>
        <App/>
      </Router>
    </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
)
