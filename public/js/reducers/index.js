import { combineReducers } from 'redux'
import { GET_RECORDS, UPDATE_RECORDS, DELETE_RECORDS } from '../actions'

const recordsReducer = (state = {}, action) => {
  console.log('ACTION', action)
  switch (action.type) {
    case GET_RECORDS:
      return {
        ...state,
        
      }
      default:
        return state
  }
}

const rootReducer = combineReducers({
  recordsReducer
})

export default rootReducer