import {types} from '../actions';

import {handleActionStart, handleActionError} from './util';

const initialState = {
  articles: [],
  query: '',
  fetchedAt: null,
  loading: false,
  error: null
};

function fetchArticlesCompl(state, action) {
  const updatedState = {...state};

  updatedState['query'] = ''; // reset any existin query
  updatedState['articles'] = action.articles;
  updatedState['loading'] = false;
  updatedState['error'] = null;

  updatedState['fetchedAt'] = Date.now();
  return updatedState;
}

function queryArticlesCompl(state, action) {
  const updatedState = {...state};

  updatedState['articles'] = action.articles;
  updatedState['query'] = action.query;
  updatedState['loading'] = false;
  updatedState['error'] = null;

  updatedState['fetchedAt'] = Date.now();
  return updatedState;
}

function reducer(state = initialState, action) {
  switch (action.type) {
    // START
    case types.FETCH_ARTICLES_START:
    case types.QUERY_ARTICLES_START:
      return handleActionStart(state);
    // ERROR
    case types.FETCH_ARTICLES_ERROR:
    case types.QUERY_ARTICLES_ERROR:
      return handleActionError(state, action);
    // COMPL
    case types.FETCH_ARTICLES_COMPL:
      return fetchArticlesCompl(state, action);
    case types.QUERY_ARTICLES_COMPL:
      return queryArticlesCompl(state, action);
    default:
      return state;
  }
}

export default reducer;
