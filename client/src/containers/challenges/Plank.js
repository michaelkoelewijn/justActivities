import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import socket from '../../socket';
import Button from '../../components/Button';

const jsTimer = require('easytimer.js');
const _Timer = styled.div`
    font-size: 5em;
    color: red;
`;

const _AudioContainer = styled.div`
    opacity: 0;
    position: absolute;
    z-index: -1;
    pointer-events: none;
`;

class Plank extends React.Component {

    constructor() {
        super();
        this.player = '';
        this.plankTimerEl = '';
        this.pushUpTimerEl = '';
        this.duration = {
            plank: 30,
            pushup: 20
        }
    }

    componentDidMount() {
        
        this.plankTimer = new jsTimer();
        this.pushUpTimer = new jsTimer();
        this.plankTimer.addEventListener('secondTenthsUpdated', (e) => {
            this.plankTimerEl.innerHTML = this.plankTimer.getTimeValues().toString(['minutes', 'seconds', 'secondTenths']);
        });  
        this.pushUpTimer.addEventListener('secondTenthsUpdated', (e) => {
            this.pushUpTimerEl.innerHTML = this.pushUpTimer.getTimeValues().toString(['minutes', 'seconds', 'secondTenths']);
        });  

        this.handleTimers(); 

        const { currentUser } = this.props.activities;
        if(currentUser.user.gamemaster) {
            socket.emit('CLIENT:SET_STARTTIME', true);
        }

        

        
    }

    handleTimers() {
        const timerConfig = {
            precision: 'secondTenths',
            startValues: { seconds: 0 }
        };
        this.plankTimer.start(timerConfig);

        this.plankTimer.addEventListener('secondsUpdated', (e) => {
            if(this.plankTimer.getTotalTimeValues().seconds % this.duration.plank == 0) {
                this.plankTimer.pause();
                this.pushUpTimer.start(timerConfig);
            }
        });
        this.pushUpTimer.addEventListener('secondsUpdated', (e) => {
            if(this.pushUpTimer.getTotalTimeValues().seconds % this.duration.pushup == 0) {
                this.pushUpTimer.pause();
                this.plankTimer.start(timerConfig);
            }
        });
    }

    stopImWeak() {
        this.plankTimer.pause();
        this.pushUpTimer.pause();

        const { currentUser } = this.props.activities;
        socket.emit('CLIENT:SEND_STOP_SIGNAL', {
            activity: currentUser.activity,
            user: currentUser.user.id
        });
        // console.log(this.plankTimer.getTotalTimeValues().seconds);
        // console.log(this.pushUpTimer.getTotalTimeValues().seconds);
    }

    render() {
        return (
            <div>
                <h1>Plank Challenge</h1>
                <_Timer>
                    <div ref={(el) => this.plankTimerEl = el}>00:00:0</div>
                    <div ref={(el) => this.pushUpTimerEl = el}>00:00:0</div>
                </_Timer>

                <Button title="Stop, i'm weak." onClick={this.stopImWeak.bind(this)} fixedToBottom xxl />


            </div>
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Plank));