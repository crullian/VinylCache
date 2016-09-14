export const GET_RECORDS = 'GET_RECORDS'
export const RECEIVE_RECORDS = 'RECEIVE_RECORDS'
export const UPDATE_RECORDS = 'UPDATE_RECORDS'
export const DELETE_RECORDS = 'DELETE_RECORDS'

export const requestRecords = records => ({
  type: GET_RECORDS,
  records
})

export const receiveRecords = records => ({
  type: RECEIVE_RECORDS,
  records,
  records: json.data.children.map(child => child.data)
})

const fetchRecords = records => dispatch => {
  dispatch(requestRecords(records))
  return fetch(`/records`)
    .then(response => response.json())
    .then(json => dispatch(receiveRecords(records, json)))
}