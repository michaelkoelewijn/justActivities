import socket from '../socket';

export function setUsers(users) {
    return {
        type: 'SET_USERS',
        payload: users
    }
}

export function setActivities(activities) {
    return {
        type: 'SET_ACTIVITIES',
        payload: activities
    }
}

export function setPlayer(data) {
    socket.emit(
        'JOIN_LOBBY',
        data
    )
    return {
        type: 'SET_LOCAL_USER',
        payload: data
    }
}

export function updateLobby(data) {
    return {
        type: 'UPDATE_LOBBY',
        payload: data
    }
}