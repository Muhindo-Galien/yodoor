import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import TopNav from './component/topnav/TopNav';
import DataProvider from './redux/store';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import App from './App'

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <Router>
          <TopNav/>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider> 
      </Router>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
