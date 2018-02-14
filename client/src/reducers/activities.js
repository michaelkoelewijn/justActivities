const initialState = {
    users: [],
    connectedUsers: [],
    joined: false,
    currentUser: {
        user: {
            id: 0,
            name: 'Michael',
            gamemaster: true
        },
        activity: 0
    },
    activities: [
        {
            "id": 0,
            "name": "Sally Up",
            "key": "0"
        },
        {
            "id": 1,
            "name": "Plank Challenge",
            "key": "1"
        }
    ],
    activityStarted: false

}

export default (state = initialState, action) => {
    
  switch (action.type) {
    case 'SET_LOCAL_USER':
        return {
            ...state,
            currentUser: action.payload,
            joined: true
        }   
        
    case 'UPDATE_LOBBY':
        return {
            ...state,
            connectedUsers: action.payload
        }    

    case 'SET_USERS':
        return {
            ...state,
            users: action.payload
        }    

    case 'SET_ACTIVITIES':
        return {
            ...state,
            activities: action.payload
        }    

    case 'START_GAME':
        return {
            ...state,
            activityStarted: true
        }
        
    default:
      return state
  }
}