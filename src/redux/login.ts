import axios from "../axios";
import Swal from "sweetalert2";

const initialState = {
  isLoggedIn: false,
  userData: {
    mobile: "",
    password: ""
  },
  error: {}
}

const actions = {
  SET_USER: "login/SET_USER",
  SET_ERROR: "login/SET_ERROR",
  CLEAR_USER: "login/CLEAR_USER",
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

export const loginProcess = (url: any, setPreLoader: any, callback: any) => async (dispatch: any, getState: any) => {
  try {
    const { userData } = getState().login;
    const response = await axios.post(url, userData);
    setPreLoader(false);
    if (response.data?.success) {
      let user = Object.assign({}, response.data.user, {
        role: response.data.role,
      });
      localStorage.setItem("user-details", JSON.stringify(user));
      localStorage.setItem("token", response.data.token);
      if (response?.data?.message) {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          showCloseButton: true,
          cancelButtonText: 'Ok',
          html: `<p>${response.data.message}</p>`,
        })
      }
      dispatch(clearUserData());
      callback();
    }
  } catch (error: any) {
    setPreLoader(false);
    if (error.response.data?.message) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        showCloseButton: true,
        cancelButtonText: 'Ok',
        html: `<p>${error.response.data.message}</p>`,
      })
    }
  }
}

export const clearUserData = () => (dispatch: any, getState: any) => {
  dispatch({
    type: actions.CLEAR_USER
  })
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
        isLoggedIn: true,
        userData: {
          ...state.userData,
          [action.key]: action.value
        }
      }
    }
    case actions.CLEAR_USER: {
      return {
        ...state,
        isLoggedIn: false,
        userData: {
          mobile: "",
          password: ""
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