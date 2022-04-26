import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import TopNav from './component/topnav/TopNav';
import DataProvider from './redux/store';
// import * as serviceWorker from './serviceWorker';
// import { Provider} from 'react-redux';
// import { createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension'
// // import rootReducer from './reducers';
// import store from './store';



ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <Router>
        <TopNav/>
        <App />
      </Router>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
