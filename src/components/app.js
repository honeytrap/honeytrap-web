import React, { Component } from 'react';

import Header from './header';

import Navigation from './navigation'
import Search from './search'
import Dashboard from './dashboard'

class App extends Component {
	render() {
		return (
        <div className="container">
            <div className="row">
                <div className="col-sm-3 sidebar">
                    <nav className="sidebar-nav">
                        <div className="sidebar-header">
                            <button className="nav-toggler nav-toggler-sm sidebar-toggler" type="button" data-toggle="collapse" data-target="#nav-toggleable-sm">
                                <span className="sr-only">Toggle nav</span>
                            </button>
                            <a className="sidebar-brand img-responsive" href="/">
                                <span className="icon">Honeytrap</span>
                            </a>
                        </div>
                        <div className="collapse nav-toggleable-sm" id="nav-toggleable-sm">
                            <Search />
                            <Navigation />
                            <hr className="visible-xs m-t" />
                        </div>
                    </nav>
                </div>
                <Dashboard />
            </div>
        </div>
		);
	}
}

export default App;
