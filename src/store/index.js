import thunk from 'redux-thunk';

import {applyMiddleware, compose, createStore} from 'redux';

import rootReducer from './reducers';

// enable redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create the global redux store
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
