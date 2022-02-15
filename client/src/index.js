import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import TopNav from './component/booking/TopNav';

ReactDOM.render(
  <Router>
    <TopNav/>
    <App />
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
