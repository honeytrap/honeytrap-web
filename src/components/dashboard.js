import React, { Component } from 'react';

import { connect } from 'react-redux';

import Header from './header';
import SessionList from './session-list';
import Earth from './earth';

import View from './view';
import moment from 'moment';
import Flag from "react-flags";

import * as d3 from 'd3';
import * as topojson from 'topojson';

import { clearHotCountries } from '../actions/index';
import classNames from 'classnames';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = { now: moment() };
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ now: moment() }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        if (!this.props.metadata)
            return <div>connecting</div>;

        const { start } = this.props.metadata;

        const { now } = this.state;

        var uptime = now.diff(moment(start), 'minutes');

        let prev = "";

        // sort on time
        let events = this.props.events.sort(function (left, right) {
            return moment(right.date).utc().diff(moment(left.date).utc());
        }).reduce((red, val) => {
            if (prev['source-ip'] == val["source-ip"]
                    && prev['destination-port'] == val["destination-port"]
            )
                return red;

            prev = val;

            red.push(val);
            return red;
        }, []).map((event, i) => {
            return <li className={ classNames({'show': (20 > i) }) }>
                <Flag
                    name={event['source.country.isocode']}
                    format="png"
                    pngSize={16}
                    shiny={false}
                />
                &nbsp;
                {`${event["source-ip"]} ( ${event["category"]} )`  }
            </li>;
        });

        return (
            <View title="Overview" subtitle="Dashboard">
                <div className="row" style={{ marginTop: '0px', position: 'relative' }}>
                    <ul className="list-unstyled" style={{ 'position': 'absolute', 'top': '0px', 'right': '0px' }}>
                    <li>
                        uptime:&nbsp;
                        <span>
                                { Math.floor(uptime / (60 * 24)) }d &nbsp;
                                { Math.floor(uptime / 60) }h &nbsp;
                                { Math.floor(uptime % 60) }m
                        </span>
                    </li>
                    <li>
                        version:&nbsp;
                        <span>
                            { this.props.metadata.version }
                        </span>
                    </li>
                    <li>
                        commitid:&nbsp;
                        <span>
                            { this.props.metadata.shortcommitid }
                        </span>
                    </li>
                    </ul>
                    <ul className="last-events list-unstyled" style={{ 'position': 'absolute', 'top': '0px', 'left': '0px' }}>
                        { events }
                    </ul>
                    <Earth countries={this.props.hotCountries}></Earth>
                </div>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        events: state.sessions.events,
        hotCountries: state.sessions.hotCountries,
        metadata: state.sessions.metadata,
    };
}

export default connect(mapStateToProps)(Dashboard);
