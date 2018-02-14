import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import socket from '../../socket';

import { startGame } from '../../actions/list';

import Header from '../../components/Header';
import Timer from '../../components/Timer';
import Button from '../../components/Button';
import Lobby from '../../containers/Lobby';

class Sally extends React.Component {

    constructor() {
        super();
        this.player = '';
    }

    componentDidMount() {
        socket.on('SERVER:SIGNAL_ACTIVITY_START', () => {
            this.props.actions.startGame();
        });

    }

    start() {
        this.player.play();
    }

    stopImWeak(val) {
        console.log(val);
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
                <Timer onStop={this.stopImWeak} />
            )
        }


        return (
            <div>
                <h1>Sally</h1>
                <audio ref={(audio) => { this.player = audio } }  controls="false" preload="auto">
                    <source src="/sally.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>

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