import axios from "../axios";
import Swal from "sweetalert2";

const initialState = {
  userData: {
    fName: "",
    lName: "",
    mobile: "",
    password: ""
  },
  error: {}
}

const actions = {
  SET_USER: "signup/SET_USER",
  SET_ERROR: "signup/SET_ERROR",
  CLEAR_ERROR: "signup/CLEAR_ERROR",
}


export const validateSignUpUserData = () => (dispatch: any, getState: any) => {
  const { fName, lName, mobile, password } = getState().signUp.userData;
  if (!fName) {
    dispatch(setSignUpError('signup-firstname', 'This is a required * field'));
    return false;
  };
  if (!lName) {
    dispatch(setSignUpError('signup-lastname', 'This is a required * field'));
    return false;
  };
  if (!mobile) {
    dispatch(setSignUpError('signup-mobile', 'This is a required * field'));
    return false;
  } else if (mobile.length !== 10) {
    dispatch(setSignUpError('signup-mobile', 'mobile length must be at least 10 characters long'));
    return false;
  } 
  if (!password) {
    dispatch(setSignUpError('password', 'This is a required * field'));
    return false;
  } else if (password.length < 7) {
    dispatch(setSignUpError('password', 'password length must be at least 7 characters long'));
    return false;
  }
  dispatch(setSignUpError('', ''));
  return true;
}

export const setSignUpUserData = (e: any) => (dispatch: any, getState: any) => {
  let key = e.target.attributes.getNamedItem("data-state-key").value;
  let value = e.target.value;
  dispatch({
    type: actions.SET_USER,
    key,
    value
  })
}

export const signUpProcess = (url: any, setPreLoader: any, callback: any) => async (dispatch: any, getState: any) => {
  try {
    const { userData } = getState().signUp;
    const response = await axios.post(url, userData)
    setPreLoader(false)
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
    setPreLoader(false)
    if (error.response.data.message) {
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

export const setSignUpError = (key: any, message: any) => ({
  type: actions.SET_ERROR,
  key,
  message
})

export const clearSignUpError = () => ({
  type: actions.CLEAR_ERROR
})

const signUpReducer = (state = initialState, action: any) => {
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

export default signUpReducer