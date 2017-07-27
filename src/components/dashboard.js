import React, { Component } from 'react';

import { connect } from 'react-redux';

import Header from './header';
import SessionList from './session-list';

import View from './view';
import moment from 'moment';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { dispatch } = this.props;
    }

    renderTable() {
        if(!this.props.events) {
            return (
                <div>Loading...</div>
            );
        }

        const { events } = this.props;

        return events.map((event, i) => {
            return (				
                    <tr key={i}>
                        <td>{event.date}</td>
                        <td>{event.category}</td>
                        <td>{event["source-ip"] }</td>
                        <td>{event["destination-ip"] }</td>
                        <td>{event.payload}</td>
                        <td>{event.message}</td>
                    </tr>
                
            );
        });
    }

    render() {
        const events = this.renderTable();

        var uptime = moment().diff(this.props.uptime, 'minutes');

        return (
            <View title="Overview" subtitle="Dashboards">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="statcard p-a-md statcard-success">
                            <h3 className="statcard-number">
                                { this.props.events.length }
                            </h3>
                            <span className="statcard-desc">Attacks</span>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="statcard p-a-md statcard-primary">
                            <h3 className="statcard-number">
                                { uptime }
                            </h3>
                            <span className="statcard-desc">Uptime</span>
                        </div>
                    </div>
                </div>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        events: state.sessions.events,
        uptime: state.sessions.uptime
    };
}

export default connect(mapStateToProps)(Dashboard);
