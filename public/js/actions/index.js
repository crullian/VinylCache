import fetch from "isomorphic-fetch"

export const REQUEST_RECORDS = 'REQUEST_RECORDS'
export const RECEIVE_RECORDS = 'RECEIVE_RECORDS'
export const REQUEST_SUBMIT_RECORD = 'REQUEST_SUBMIT_RECORD'
export const RECEIVE_SUBMIT_RECORD = 'RECEIVE_SUBMIT_RECORD'
export const REQUEST_EDIT_RECORD = 'EDIT_RECORD'
export const REQUEST_DELETE_RECORD = 'DELETE_RECORD'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export const requestRecords = () => ({
  type: REQUEST_RECORDS,
  isFetchingRecords: true
})

export const receiveRecords = json => ({
  type: RECEIVE_RECORDS,
  isFetchingRecords: false,
  records: json
})

export const requestSubmitRecord = () => ({
  type: REQUEST_SUBMIT_RECORD
})

export const requestEditRecord = () => ({
  type: REQUEST_EDIT_RECORD
})

export const requestDeleteRecord = () => ({
  type: REQUEST_DELETE_RECORD
})

export const requestLogin = creds => ({
  type: LOGIN_REQUEST,
  isFetching: true,
  isAuthenticated: false,
  creds
})

export const receiveLogin = user => ({
  type: LOGIN_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  id_token: user.token
})

export const errorLogin = message => ({
  type: LOGIN_FAILURE,
  isFetching: false,
  isAuthenticated: false,
  message
})

export const requestLogout = () => ({
  type: LOGOUT_REQUEST,
  isFetching: true,
  isAuthenticated: true
})

export const receiveLogout = () => ({
  type: LOGOUT_SUCCESS,
  isFetching: false,
  isAuthenticated: false
})

export const errorLogout = () => ({
  type: LOGOUT_FAILURE,
  isFetching: false,
  isAuthenticated: true
})

export const fetchRecords = () => dispatch => {
  dispatch(requestRecords())
  return fetch(`/records`, {
    method:'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('id_token')
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        console.error(`Network response was not ok: ${response}`)
      }
    })
    .then(json => dispatch(receiveRecords(json)))
    .catch(error => console.error(`There was a problem with your fetch operation: ${error.message}`))
}

export const submitRecord = record => dispatch => {
  dispatch(requestSubmitRecord())
  return fetch(`/records`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('id_token')
    },
    body: JSON.stringify(record)
  })
  .then(response => {
    if (response.ok) {
      return response.json().then(json => dispatch(receiveRecords(json)))
    } else {
      console.error(`Network response was not ok: ${response}`)
    }
  })
  .catch(error => console.error(`There was a problem with your fetch operation: ${error.message}`))
}

export const removeRecord = id => dispatch => {
  dispatch(requestDeleteRecord())
  return fetch(`/records/${id}`, {
    method: 'delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('id_token')
    },
    body: {id}
  })
  .then(response => {
    if (response.ok) {
      return response.json().then(json => dispatch(receiveRecords(json)))
    } else {
      console.error(`Network response was not ok: ${response}`)
    }
  })
  .catch(error => console.error(`There was a problem with your fetch operation: ${error.message}`))
}

export const editRecord = record => dispatch => {
  dispatch(requestEditRecord())
  return fetch(`/records/${record.id}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('id_token')
    },
    body: JSON.stringify(record)
  })
  .then(response => {
    if (response.ok) {
      console.log('RESPONSE', response);
      return response.json().then(json => dispatch(receiveRecords(json)))
    } else {
      console.error(`Network response was not ok: ${response.message}`)
    }
  })
  // .then(json => dispatch(receiveRecords(json)))
  .catch(error => console.error(`There was a problem with your fetch operation: ${error.message}`))
}

export const loginUser = creds => dispatch => {
  dispatch(requestLogin(creds))
  return fetch('/authenticate', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `username=${creds.username}&password=${creds.password}`
  })
  .then(response => 
     response.json().then(user => ({ user, response })))
  .then(({ user, response }) => {
    if (!response.ok) {
      dispatch(errorLogin(user.message))
      return Promise.reject(user)
    } else {
      localStorage.setItem('id_token', user.token)
      dispatch(receiveLogin(user))
    }
  })
  .catch(err => console.error('Error:', err))
}

export const logoutUser = () => dispatch => {
  dispatch(requestLogout())
  localStorage.removeItem('id_token')
  dispatch(receiveLogout())
}
