import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from "redux";

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducers/reducer';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : null;


const rootReducer = reducer;


const store = createStore(rootReducer, 
    composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));

registerServiceWorker();