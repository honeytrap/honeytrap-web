import React, { Component } from 'react';

import { connect } from 'react-redux';

import Header from './header';
import SessionList from './session-list';

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

                return (
                    <div className="col-sm-9 content">
                        <div className="dashhead">
                            <Header title="Overview" subtitle="Dashboards" />
                            <div className="btn-toolbar dashhead-toolbar">
                                <div className="btn-toolbar-item input-with-icon">
                                    <span className="icon"></span>
                                </div>
                            </div>
                        </div>
                        <hr className="m-t" />
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="header">Date</th>
                                    <th className="header">Category</th>
                                    <th className="header">Source</th>
                                    <th className="header">Destination</th>
                                    <th className="header">Payload</th>
                                    <th className="header">Message</th>
                                </tr>
                            </thead>
                            <tbody>
                            { events }
                            </tbody>
                        </table>
                    </div>
                );
            }
}

            function mapStateToProps(state) {
                return {
                    events: state.sessions.events
                };
            }

            export default connect(mapStateToProps)(Dashboard);
