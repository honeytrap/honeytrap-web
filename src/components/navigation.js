import React, { Component } from 'react';
import { Link } from 'react-router'
import activeComponent from 'react-router-active-component'

var NavLink = activeComponent('li')

class Navigation extends Component {
    render() {
        return (
            <ul className="nav nav-pills nav-stacked">
                <li className="nav-header">Dashboard</li>
                <NavLink activeClassName="active" to="/">Overview</NavLink>
                <li className="nav-header">Events</li>
                <NavLink activeClassName="active" to="/events">Overview</NavLink>
                <li className="nav-header">Agents</li>
                <NavLink activeClassName="active" to="/agents">Overview</NavLink>
                <li className="nav-header">Configuration</li>
                <NavLink activeClassName="active" to="/configuration/">Overview</NavLink>
                <li className="nav-header">Other</li>
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
