import {combineReducers} from 'redux';

import articles from './articles';

const rootReducer = combineReducers({
  // Register all reducers here.
  articles
});

export default rootReducer;
