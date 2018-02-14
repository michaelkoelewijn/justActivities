const initialState = {
    count: 0,
    todos: [
        {
            id: 1,
            title: 'Ramen eten',
            done: true,
        },
        {
            id: 2,
            title: 'Stofzuigen',
            done: false,
        }
    ]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
        return {
            ...state,
            count: state.count+1
        }
    
    case 'DECREMENT':
        return {
            ...state,
            count: state.count-1
        }   
        
    case 'ADD_TODO':
        return {
            ...state,
            todos: [...state.todos, action.payload]
        }    

    case 'REMOVE_TODO':
        return {
            ...state,
            todos: state.todos.filter((item, index) => {
                return action.payload !== item.id;
            })
        } 
        
    case 'STATUS_CHANGE':
        return {
            ...state,
            todos: state.todos.map((item, index) => {
                if(item.id === action.payload) {
                    return {
                        ...item,
                        done: !item.done
                    }
                }

                return {
                    ...item
                }

            })
        }
        

    default:
      return state
  }
}