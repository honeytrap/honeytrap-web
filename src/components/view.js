import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addSession, fetchSessions } from '../actions/index';
import { Link } from 'react-router';

import Navigation from './navigation';
import Search from './search';
import Header from './header';

class View extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let disconnected = null;

        if (!this.props.connected) {
            disconnected = (
                <div className="alert alert-danger" role="alert">
                    Connection with sensor has been lost.
                </div>
            );
        }

        let versionAvailable = null;
        if (false) {
            versionAvailable =
                <div className="alert alert-warning" role="alert">
                    New version available. <a>Upgrade</a>.
                </div>;
        }

        return (
            <div className="container">
                <div className="row">
                    { disconnected }
                    <div className="col-sm-3 sidebar">
                        <nav className="sidebar-nav">
                            <div className="sidebar-header">
                                <a className="sidebar-brand img-responsive" href="/">
                                    <span className="icon">Honeytrap</span>
                                </a>
                            </div>
                            <div className="collapse nav-toggleable-sm" id="nav-toggleable-sm">
                                { versionAvailable }
                                <Navigation />
                                <hr className="visible-xs m-t" />
                            </div>
                        </nav>
                    </div>
                    <div className="col-sm-9 content">
                        <div className="dashhead">
                            <Header title={ this.props.title } subtitle={ this.props.subtitle } />
                            <div className="btn-toolbar dashhead-toolbar">
                                <div className="btn-toolbar-item input-with-icon">
                                    <span className="icon"></span>
                                </div>
                            </div>
                        </div>
                        <hr className="m-t" />
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        connected: state.sessions.connected
    };
}

export default connect(mapStateToProps)(View);
