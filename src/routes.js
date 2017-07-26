import React from 'react';
import { Route, IndexRoute } from 'react-router';

import SessionShow from './components/session-show';
import Socket from './components/socket';
import Server from './components/server';
import Random from './components/random';
import Dashboard from './components/dashboard';
import SessionList from './components/session-list';
import ConfigurationOverview from './components/configuration-overview';
import App from './components/app';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Dashboard} />
		<Route path="/configuration/" component={ConfigurationOverview} />
    /*
		<Route path="/session/:id" component={SessionShow} />
		<Route path="/session/:id" component={SessionShow} />
		<Route path="/socket" component={Socket} />
		<Route path="/server" component={Server} />
		<Route path="/random" component={Random} />
    */
	</Route>
);
