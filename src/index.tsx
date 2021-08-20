import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import ProductMan from './components/ProductMan';
import InvView from './components/InvMan';
import HomeView from './components/HomePage';
import { HashRouter,Route } from 'react-router-dom';
import Shownav from './components/NavBar';
import { Noki } from './components/Sample';


ReactDOM.render(
  <React.StrictMode>
  <Shownav />

  <HashRouter>
  <Route path="/HOME"><HomeView /></Route>  
  <Route path="/PRODUCTS/PRODMAN"><ProductMan /></Route>
  <Route path="/INVMAN/INV"><InvView /></Route>
  <Route path="/test"><Noki /></Route>
</HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
