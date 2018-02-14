import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import list from './list'
import activities from './activities'

export default combineReducers({
  router: routerReducer,
  list,
  activities
})