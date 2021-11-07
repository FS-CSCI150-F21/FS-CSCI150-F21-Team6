import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


import { reducers } from './reducers';
import App from './App';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";

import "react-toastify/dist/ReactToastify.css";
import { contactReducer } from "./redux/reducers/contactReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));
const store1 = createStore(contactReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store,store1}>
  <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);