import axios from "../axios";
import Swal from "sweetalert2";

const initialState = {
  userData: {
    mobile: "",
    password: ""
  },
  error: {}
}

const actions = {
  SET_USER: "login/SET_USER",
  SET_ERROR: "login/SET_ERROR",
  CLEAR_ERROR: "login/CLEAR_ERROR",
}


export const validateLoginUserData = () => (dispatch: any, getState: any) => {
  const { mobile, password } = getState().login.userData;
  if (!mobile) {
    dispatch(setLoginError('mobile', 'This is a required * field'));
    return false;
  } else if (mobile.length !== 10) {
    dispatch(setLoginError('mobile', 'mobile length must be at least 10 characters long'));
    return false;
  }
  if (!password) {
    dispatch(setLoginError('password', 'This is a required * field'));
    return false;
  } else if (password.length < 7) {
    dispatch(setLoginError('password', 'password length must be at least 7 characters long'));
    return false;
  }
  dispatch(setLoginError('', ''));
  return true;
}

export const setLoginUserData = (e: any) => (dispatch: any, getState: any) => {
  let key = e.target.attributes.getNamedItem("data-state-key").value;
  let value = e.target.value;
  dispatch({
    type: actions.SET_USER,
    key,
    value
  })
}

export const loginProcess = (callback: any) => async (dispatch: any, getState: any) => {
  try {
    const { userData } = getState().login;
    const response = await axios.post("nurse/login", userData)
    if(response?.data?.message) {
      Swal.fire({
        title: 'Success',
        icon: 'success',
        showCloseButton: true,
        cancelButtonText: 'Ok',
        html: `<p>${response.data.message}</p>`,
      })
      callback();
    }
  } catch (error) {
    if (error.response.data) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        showCloseButton: true,
        cancelButtonText: 'Ok',
        html: `<p>${error.response.data}</p>`,
      })
    }
  }
}

export const setLoginError = (key: any, message: any) => ({
  type: actions.SET_ERROR,
  key,
  message
})

export const clearLoginError = () => ({
  type: actions.CLEAR_ERROR
})

const loginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.SET_USER: {
      return {
        ...state,
        userData: {
          ...state.userData,
          [action.key]: action.value
        }
      }
    }
    case actions.SET_ERROR: {
      return {
        ...state,
        error: {
          [action.key]: action.message || {}
        }
      }
    }
    case actions.CLEAR_ERROR: {
      return {
        ...state,
        error: {}
      }
    }
    default: return state;
  }
}

export default loginReducer