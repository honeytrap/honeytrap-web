import React, { Component } from 'react';

import { connect } from 'react-redux';

import Header from './header';
import SessionList from './session-list';
import Earth from './earth';

import View from './view';
import moment from 'moment';

import * as d3 from 'd3';
import * as topojson from 'topojson';

import { clearHotCountries } from '../actions/index';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { dispatch } = this.props;
    }

    render() {
        if (!this.props.metadata)
            return <div>connecting</div>;

        console.log(this.props.metadata.start);

        const { start } = this.props.metadata;

        var uptime = moment().diff(moment(start), 'minutes');


        return (
            <View title="Overview" subtitle="Dashboard">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="statcard p-a-md statcard-primary">
                            <h3 className="statcard-number">
                                <span>
                                    <b>{ this.props.metadata.version }</b>
                                </span>
                            </h3>
                            <span className="statcard-desc">Version</span>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="statcard p-a-md statcard-primary">
                            <h3 className="statcard-number">
                { Math.floor(uptime / (3600 * 24)) }d &nbsp;
            { Math.floor(uptime / 3600) }h &nbsp;
                                { Math.floor(uptime % 60) }m
                            </h3>
                            <span className="statcard-desc">Uptime</span>
                        </div>
                    </div>
                </div>
                <div className="row" style={{ marginTop: '80px' }}>
                <Earth countries={this.props.hotCountries}></Earth>
                </div>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        events: state.sessions.events,
        uptime: state.sessions.uptime,
        version: state.sessions.version,
        release_tag: state.sessions.release_tag,
        shortcommitid: state.sessions.shortcommitid,
        hotCountries: state.sessions.hotCountries,
        metadata: state.sessions.metadata,
    };
}

export default connect(mapStateToProps)(Dashboard);
