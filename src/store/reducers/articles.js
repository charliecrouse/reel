import {types} from '../actions';

import {handleActionStart, handleActionError} from './util';

const initialState = {
  articles: [],
  loading: false,
  error: null
};

function fetchArticlesCompl(state, action) {
  const updatedState = {...state};

  updatedState['loading'] = false;
  updatedState['error'] = null;
  updatedState['articles'] = action.articles;

  return updatedState;
}

function reducer(state = initialState, action) {
  switch (action.type) {
    // START
    case types.FETCH_ARTICLES_START:
      return handleActionStart(state);
    // ERROR
    case types.FETCH_ARTICLES_ERROR:
      return handleActionError(state, action);
    // COMPL
    case types.FETCH_ARTICLES_COMPL:
      return fetchArticlesCompl(state, action);
    default:
      return state;
  }
}

export default reducer;
