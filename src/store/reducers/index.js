import {combineReducers} from 'redux';

import articles from './articles';
import sentiments from './sentiments';

const rootReducer = combineReducers({
  // Register all reducers here.
  articles,
  sentiments
});

export default rootReducer;
