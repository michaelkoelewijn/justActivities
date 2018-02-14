import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom';

import { updateLobby } from '../actions/list';
import socket from '../socket';
const _Lobby = styled.div`

    h1 {
        background-color: #FFF;
        padding: 0.5em;
        border: 1px solid #ddd;
        text-align: center;
        font-size: 1.5em;
    }

    table {
        width: 100%;
        margin: 0 -0.75em;
        th { text-align: left; }
        td {}
        th, td { padding: 0.25em 0.75em; }
        tbody tr:nth-child(even) { }
        tbody tr:nth-child(odd) { background-color: #FFF; }

    }
`;



class Lobby extends React.Component {

    componentDidMount() {
        socket.on('SERVER:SIGNAL_USERS', (msg) => {
            this.props.actions.updateLobby(msg);
        })

        

    }

    render() {

        const { activities, currentUser } = this.props.activities;
        let activity = activities.filter((item) => item.id == currentUser.activity)[0]

        return (
                <_Lobby>
                    <h1>{activity.name}</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Game master</th>
                            </tr>
                        </thead>
                        <tbody>

                            { this.props.activities.connectedUsers.map((item, index) => {
                                return (
                                    <tr key={item.data.user.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.data.user.name}</td>
                                        <td>{item.data.user.gamemaster ? 'X' : ''}</td>
                                    </tr>
                                )
                            }) }
                            
                        </tbody>
                    </table>
                </_Lobby>
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
        actions: bindActionCreators({ updateLobby }, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Lobby))