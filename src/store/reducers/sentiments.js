import {types} from '../actions';
import {handleActionStart, handleActionError} from './util';

const initialState = {
  sentiments: [],
  loading: false,
  error: null
};

function fetchSentimentCompl(state, action) {
  const updatedState = {...state};

  updatedState['loading'] = false;
  updatedState['error'] = false;
  updatedState['sentiments'] = action.sentiments;

  return updatedState;
}

function reducer(state = initialState, action) {
  switch (action.type) {
    // START
    case types.FETCH_SENTIMENTS_START:
      return handleActionStart(state);
    // ERROR
    case types.FETCH_ARTICLES_ERROR:
      return handleActionError(state, action);
    // COMPL
    case types.FETCH_SENTIMENTS_COMPL:
      return fetchSentimentCompl(state, action);
    default:
      return state;
  }
}

export default reducer;
