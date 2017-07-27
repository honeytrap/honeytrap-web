import React from 'react';
import { Redirect, Route, IndexRoute } from 'react-router';

import SessionShow from './components/session-show';
import Socket from './components/socket';
import Server from './components/server';
import Random from './components/random';
import Dashboard from './components/dashboard';
import SessionList from './components/session-list';
import ConfigurationOverview from './components/configuration-overview';
import App from './components/app';

export default (
	  <Route path="/" component={Dashboard}>
		    <Route path="/configuration/" component={ConfigurationOverview} />
        /*
		    <Route path="/session/:id" component={SessionShow} />
		    <Route path="/session/:id" component={SessionShow} />
		    <Route path="/socket" component={Socket} />
		    <Route path="/server" component={Server} />
		    <Route path="/random" component={Random} />
        */
        <Redirect from='*' to='/404' />
	  </Route>
);
