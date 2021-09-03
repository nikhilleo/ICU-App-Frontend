import { combineReducers } from 'redux';
import loginReducer from './login';
import signUpReducer from './signup';
import PatientReducer from './patient';

const rootReducer = combineReducers({
  signUp: signUpReducer,
  login: loginReducer,
  patient: PatientReducer,
});

export default rootReducer;
