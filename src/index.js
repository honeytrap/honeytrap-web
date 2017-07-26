import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { dispatch, compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { browserHistory, Router, Route } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
// import { Intl }  from 'react-intl-es6';
import { i18n } from './config';

import promise from 'redux-promise';
// import css from './style.css';
import css from './toolkit-inverse.css';
import application_css from './application.css';
import routes from './routes';

import { Websocket } from './components/index';

import App from './components/app';
import reducers from './reducers';

function configureStore() {
    return createStore(
        /*
        enableBatching(
            combineReducers({
            })
        ), {
        },
        compose(persistState())
        */
    );
}

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
    <div>
        <Websocket store={store}/>
        <Provider store={store}>
            <Router history={browserHistory} routes={routes} />
        </Provider>
    </div>
    , document.querySelector('#root'));
