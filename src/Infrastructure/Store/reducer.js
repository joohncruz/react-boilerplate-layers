import { combineReducers } from 'redux';

import auth, { STORE_NAME as AUTH_STORE_NAME } from './Auth';

export const reducers = {
  [AUTH_STORE_NAME]: auth,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
