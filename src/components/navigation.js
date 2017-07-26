import React, { Component } from 'react';
import { Link } from 'react-router'

class Navigation extends Component {
    render() {
        return (
            <ul className="nav nav-pills nav-stacked">
                <li className="nav-header">Dashboards</li>
                <li className="active">
                    <Link to="/">Overview</Link>
                </li>
                <li className="nav-header">Configuration</li>
                <li className="">
                    <Link to="/configuration/">Overview</Link>
                </li>
                <li className="nav-header">More</li>
                <li >
                    <a href="https://honeytrap.io/">
                        Honeytrap
                    </a>
                </li>
            </ul>
        );
    }
}

export default Navigation;
