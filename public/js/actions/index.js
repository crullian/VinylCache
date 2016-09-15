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