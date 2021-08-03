import { combineReducers } from 'redux';
import loginReducer from './login';
import signUpReducer from './signup';

const rootReducer = combineReducers({
  signUp: signUpReducer,
  login: loginReducer,
});

export default rootReducer;
