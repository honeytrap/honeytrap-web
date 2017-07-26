import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Socket from '../utils/socket'
import { default as Socket } from '../utils/socket';

class Websocket extends Component {
    componentWillMount() {
	      const { dispatch } = this.props;

        let socket = new Socket("ws://172.16.84.192:3001/ws");
        socket.startWS(dispatch);
    }

    render() {
        return null;
    }
}

function select(state, ownProps) {
    return {
        ...ownProps
    };
}

export default connect(select)(Websocket);
