import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Header from './Header';
import Button from './Button';
import UserSelection from '../containers/UserSelection';
import ActivitySelection from '../containers/ActivitySelection';
import Lobby from '../containers/Lobby';
import { setPlayer } from '../actions/list';
import firebase, {config} from '../firebase';
import socket from '../socket';

const _Home = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`

class Home extends React.Component {

    constructor() {
        super();
        this.user = {
            gamemaster: false
        };
    }

    componentDidMount() {         
        socket.on('SERVER:SIGNAL_START', () => {
            this.props.history.push('/activity');
        });
    }

    join(e) {
        this.props.actions.setPlayer({
            'user': this.user,
            'activity': this.activity
        });
    }

    start() {
        socket.emit('CLIENT:START_GAME');
    }

    selectUser = (val) => {
        let user = this.props.activities.users.filter((child) => {
            if(child.id == parseInt(val)) return true;
        });
        this.user = { ...this.user, ...user[0] }
    }

    selectGameMaster = (val) => {
        this.user.gamemaster = val;
    }

    selectActivity = (activity) => {
        this.activity = parseInt(activity);
    }

    render() {
        let content;
        let startButton = this.props.activities.currentUser.user.gamemaster ?
        <Button onClick={ this.start.bind(this) } title="Start game" fixedToBottom />
        : 
        false;


        if(this.props.activities.joined) {
            content = (
                <React.Fragment>
                    <Lobby />
                    {
                        startButton
                    }
                </React.Fragment>
            )
        }else {
            content = (
                <React.Fragment>
                    <UserSelection selectGameMaster={this.selectGameMaster} selectUser={this.selectUser} />
                    <ActivitySelection selectActivity ={this.selectActivity} /> 
                    <Button onClick={ this.join.bind(this) } title="Join game" fixedToBottom />
                </React.Fragment>
            )
        }

        return (
            <_Home>
                <Header />
                {content}
            </_Home>
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
        actions: bindActionCreators({ setPlayer  }, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));