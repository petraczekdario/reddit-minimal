import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './components/store.js'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //  Wrap the App component with the Provider
  <Provider store={store}>
    <App />
  </Provider>
);