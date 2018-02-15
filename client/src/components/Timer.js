import React from "react";
import styled from 'styled-components';

import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from './Button';
import socket from '../socket';

const jsTimer = require('easytimer.js');

const _Timer = styled.div`
    font-size: 5em;
    color: red;
`;

class Timer extends React.Component {

    constructor() {
        super();
        this.state = {
            disabled: false
        }
    }

    componentDidMount() {
        this.timer = new jsTimer();
        setTimeout(() => {
            this.timer.start({
                precision: 'secondTenths',
                startValues: { seconds: 0 }
            });
            socket.emit('CLIENT:SET_STARTTIME', true);
            this.props.onStart(); //Callback

        }, this.props.startAfter);
        
        this.timer.addEventListener('secondTenthsUpdated', (e) => {
            this.timerEl.innerHTML = this.timer.getTimeValues().toString(['minutes', 'seconds', 'secondTenths']);
        });   
    }

    stop() {

        const { currentUser } = this.props.activities;
        socket.emit('CLIENT:SEND_STOP_SIGNAL', {
            activity: currentUser.activity,
            user: currentUser.user.id,
            // score: parseInt(this.timer.getTotalTimeValues().toString(['seconds'])),
            // date: `${currDate.getFullYear()}-${currDate.getMonth()}-${currDate.getDate()}`
        });
        
        this.timer.pause();
        this.props.onStop(this.timer.getTotalTimeValues());
        this.setState({
            disabled: true
        })
        
    }

    render() {
        return (
            <React.Fragment>
                <_Timer>
                    <div ref={(el) => this.timerEl = el}></div>
                </_Timer>

                <Button disabled={this.state.disabled} onClick={this.stop.bind(this)} title="Stop, i'm weak!" fixedToBottom />
            </React.Fragment>
        )
    }
}



function mapStateToProps(state) {
    return {
        activities: state.activities
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ }, dispatch)
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Timer));