import React from 'react';
import { Route, IndexRoute } from 'react-router';

import SessionShow from './components/session-show';
import Socket from './components/socket';
import Server from './components/server';
import Random from './components/random';
import SessionList from './components/session-list';
import App from './components/app';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={SessionList} />
		<Route path="/session/:id" component={SessionShow} />
		<Route path="/socket" component={Socket} />
		<Route path="/server" component={Server} />
		<Route path="/random" component={Random} />
	</Route>
);