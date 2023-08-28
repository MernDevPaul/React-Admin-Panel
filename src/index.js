import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../src/Assets/Css/MasterCss.css';
import '../src/Assets/Css/Style.css';
import "../src/Assets/Css/Responsive.css";
import { Provider } from "react-redux";
import Store from './Store/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);


