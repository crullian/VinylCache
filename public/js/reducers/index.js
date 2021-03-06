import { combineReducers } from 'redux'
import { REQUEST_RECORDS, 
         RECEIVE_RECORDS,
         UPDATE_RECORDS, 
         DELETE_RECORDS,
         LOGIN_REQUEST,
         LOGIN_SUCCESS,
         LOGIN_FAILURE, 
         LOGOUT_SUCCESS } from '../actions'

const recordsReducer = (state = {records:[], isFetchingRecords: false}, action) => {
  switch (action.type) {
    case REQUEST_RECORDS:
      return {
        ...state,
        isFetchingRecords: action.isFetchingRecords
      }
    case RECEIVE_RECORDS:
      return {
        ...state,
        records: action.records,
        isFetchingRecords: action.isFetchingRecords
      }
    default:
      return state
  }
}

const isExp = () => {
  let token = localStorage.getItem('id_token');
  if (!token) {
    return false;
  }
  return (JSON.parse(atob(token.split('.')[1])).exp * 1000) > Date.now() ? true : false;
}

const authReducer = (state = {
    isFetching: true,
    isAuthenticated: isExp()
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
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false
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
