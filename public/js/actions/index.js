import fetch from "isomorphic-fetch"

export const REQUEST_RECORDS = 'REQUEST_RECORDS'
export const RECEIVE_RECORDS = 'RECEIVE_RECORDS'
export const REQUEST_SUBMIT_RECORD = 'REQUEST_SUBMIT_RECORD'
export const RECEIVE_SUBMIT_RECORD = 'RECEIVE_SUBMIT_RECORD'
export const REQUEST_EDIT_RECORD = 'EDIT_RECORD'
export const REQUEST_DELETE_RECORD = 'DELETE_RECORD'

export const requestRecords = () => ({
  type: REQUEST_RECORDS,
})

export const receiveRecords = json => ({
  type: RECEIVE_RECORDS,
  records: json
})

export const requestSubmitRecord = () => ({
  type: REQUEST_SUBMIT_RECORD,
})

export const requestEditRecord = () => ({
  type: REQUEST_EDIT_RECORD,
})

export const requestDeleteRecord = () => ({
  type: REQUEST_DELETE_RECORD,
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

export const submitRecord = record => dispatch => {
  dispatch(requestSubmitRecord())
  return fetch(`/records`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(record)
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

export const removeRecord = id => dispatch => {
  dispatch(requestDeleteRecord())
  return fetch(`/records/${id}`, {
    method: 'delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: {id}
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

export const editRecord = record => dispatch => {
  dispatch(requestEditRecord())
  return fetch(`/records/${record.id}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(record)
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
