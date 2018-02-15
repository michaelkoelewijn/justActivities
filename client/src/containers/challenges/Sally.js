import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import socket from '../../socket';
import styled from 'styled-components';

import { startGame } from '../../actions/list';

import Header from '../../components/Header';
import Timer from '../../components/Timer';
import Button from '../../components/Button';
import Lobby from '../../containers/Lobby';

import db from '../../firebase';

const _AudioContainer = styled.div`
    opacity: 0;
    position: absolute;
    z-index: -1;
    pointer-events: none;
`;

class Sally extends React.Component {

    constructor() {
        super();
        this.player = '';
        this.failPlayer = '';
    }

    componentDidMount() {
        socket.on('SERVER:SIGNAL_ACTIVITY_START', () => {
            this.props.actions.startGame();
        });
    }

    start() {
        this.player.play();
    }

    onStart() {
        console.log(`Sally has started`);
    }

    stopImWeak(val) {
        
        // var currDate = new Date();
        const { currentUser } = this.props.activities;
        

        if(!currentUser.user.gamemaster) {
            this.failPlayer.play();
        }

    }

    render() {
        const { currentUser, activityStarted } = this.props.activities;
        if(currentUser.user.gamemaster) {
            setTimeout(() => {
                this.player.onplaying = () => {
                    socket.emit('CLIENT:SEND_START_SIGNAL', true);
                };
            }, 100);
        }

        let content;
        if(!activityStarted) {
            content = (
                <Button onClick={this.start.bind(this)} title="Start" fixedToBottom /> 
            )
        } else {
            content = (
                <Timer startAfter={4000} onStart={this.onStart} onStop={this.stopImWeak.bind(this)} />
            )
        }


        return (
            <div>
                <h1>Sally</h1>
                <_AudioContainer>
                    <audio ref={(audio) => { this.player = audio } }  controls="false" preload="auto">
                        <source src="/sally.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>

                    <audio ref={(audio) => { this.failPlayer = audio } }  controls="false" preload="auto">
                        <source src="/fail.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </_AudioContainer>

                {content}
                

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
        actions: bindActionCreators({ startGame }, dispatch)
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Sally));