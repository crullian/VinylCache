import fetch from "isomorphic-fetch"

export const REQUEST_RECORDS = 'REQUEST_RECORDS'
export const RECEIVE_RECORDS = 'RECEIVE_RECORDS'
export const UPDATE_RECORDS = 'UPDATE_RECORDS'
export const DELETE_RECORDS = 'DELETE_RECORDS'

export const requestRecords = () => ({
  type: REQUEST_RECORDS,
})

export const receiveRecords = json => ({
  type: RECEIVE_RECORDS,
  records: json
})

export const fetchRecords = () => dispatch => {
  dispatch(requestRecords())
  return fetch(`/records`)
    .then(response => response.json())
    .then(json => dispatch(receiveRecords(json)))
}