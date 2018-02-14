const initialState = {
    users: [],
    connectedUsers: [],
    joined: false,
    currentUser: {
        user: {
            id: 0,
            name: 'Michael'
        },
        activity: ''
    },
    activities: []
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
    default:
      return state
  }
}