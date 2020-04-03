import {combineReducers} from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';

const appReducer = combineReducers({
  atuth: authReducer,
  userData: userReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
