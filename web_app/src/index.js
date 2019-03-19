import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import storeSynchronize from 'redux-localstore';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import logger from 'redux-logger'

const initialState = JSON.parse(localStorage.reduxStore);

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(thunk),
        applyMiddleware(logger)
    )
)

storeSynchronize(store)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
