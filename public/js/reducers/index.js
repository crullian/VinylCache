import { combineReducers } from 'redux'
import { REQUEST_RECORDS, 
         RECEIVE_RECORDS, 
         UPDATE_RECORDS, 
         DELETE_RECORDS 
        } from '../actions'

const recordsReducer = (state = {records:[]}, action) => {
  switch (action.type) {
    case REQUEST_RECORDS:
      return {
        ...state
      }
    case RECEIVE_RECORDS:
      return {
        ...state,
        records: action.records
      }
      default:
        return state
  }
}

const rootReducer = combineReducers({
  recordsReducer
})

export default rootReducer
