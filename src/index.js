import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { dispatch, compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { browserHistory, Redirect, Router, Route } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

// import { Intl }  from 'react-intl-es6';
import { i18n } from './config';

import promise from 'redux-promise';
// import css from './style.css';
import css from './toolkit-inverse.css';
import application_css from './application.css';
import routes from './routes';

import { Websocket } from './components/index';

import Navigation from './components/navigation'
import Search from './components/search'

import reducers from './reducers';

import Dashboard from './components/dashboard';
import Attacks from './components/attacks';
import Events from './components/events';
import Agents from './components/agents';

import SessionList from './components/session-list';
import ConfigurationOverview from './components/configuration-overview';
import App from './components/app';
import NotFoundPage from './components/not-found';

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
            <Router history={browserHistory} >
                <Route path="/" component={Dashboard} / >
                <Route path="/agents" component={Agents} />
                <Route path="/events" component={Events} />
                <Route path="/configuration" component={ConfigurationOverview} />
                <Route path="/404" component={NotFoundPage} />
                <Redirect from='*' to='/404' />
            </Router>
        </Provider>
    </div>
    , document.querySelector('#root'));
