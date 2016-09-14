import { combineReducers } from 'redux'
import { REQUEST_RECORDS, RECEIVE_RECORDS, UPDATE_RECORDS, DELETE_RECORDS } from '../actions'

const compare = (a,b) => {
  if (a.artist && b.artist) {
    let a_artist = a.artist.replace('The ', '');
    let b_artist = b.artist.replace('The ', '');
    if (a_artist < b_artist) {
      return -1;
    } else if (a_artist > b_artist) {
      return 1;
    }
    if (a.year < b.year) {
      return -1;
    } else if (a.year > b.year) {
      return 1;
    } else {
      return 0;
    }
  } else {
    return;
  }
}

const recordsReducer = (state = {records:[]}, action) => {
  console.log('ACTION', action, 'STATE', state);
  switch (action.type) {
    case REQUEST_RECORDS:
      return {
        ...state
      }
    case RECEIVE_RECORDS:
      return {
        ...state,
        records: action.records.sort(compare)
      }
      default:
        return state
  }
}

const rootReducer = combineReducers({
  recordsReducer
})

export default rootReducer
