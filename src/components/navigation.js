import React, { Component } from 'react';
import { Link } from 'react-router'
import activeComponent from 'react-router-active-component'

var NavLink = activeComponent('li')

class Navigation extends Component {
    render() {
        return (
            <ul className="nav nav-pills nav-stacked">
                <li className="nav-header">Dashboards</li>
                <NavLink activeClassName="active" to="/">Overview</NavLink>
                <NavLink activeClassName="active" to="/attacks">Attacks</NavLink>
                <li className="nav-header">Configuration</li>
                <NavLink activeClassName="active" to="/configuration/">Overview</NavLink>
                <NavLink activeClassName="active" to="/configuration/canaries">Canaries</NavLink>
                <NavLink activeClassName="active" to="/configuration/channels">Channels</NavLink>
                <li className="nav-header">System</li>
                <li>
                    <a>Reboot</a>
                </li>
                <li className="nav-header">More</li>
                <li >
                    <a href="https://honeytrap.io/">
                        honeytrap.io
                    </a>
                </li>
            </ul>
        );
    }
}

export default Navigation;
