import { combineReducers } from 'redux'
import { REQUEST_RECORDS, 
         RECEIVE_RECORDS, 
         UPDATE_RECORDS, 
         DELETE_RECORDS,
         LOGIN_REQUEST,
         LOGIN_SUCCESS,
         LOGIN_FAILURE, 
         LOGOUT_SUCCESS } from '../actions'

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

const authReducer = (state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
    // TODO: check if token is expired or not!
  }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  authReducer,
  recordsReducer
})

export default rootReducer
