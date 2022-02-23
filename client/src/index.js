import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import TopNav from './component/topnav/TopNav';
import { Provider} from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers';
import store from './store';




ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <Router>
      <TopNav/>
      <App />
    </Router>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
