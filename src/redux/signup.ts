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
  CLEAR_USER: "signup/CLEAR_USER",
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
    dispatch(setSignUpError('signup-password', 'This is a required * field'));
    return false;
  } else if (password.length < 7) {
    dispatch(setSignUpError('signup-password', 'password length must be at least 7 characters long'));
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
    const response = await axios.post(url, userData);
    setPreLoader(false);
    if (response.data?.success) {
      dispatch({
        type: actions.CLEAR_USER
      })
      if (response.data?.token) {
        let user = Object.assign({}, response.data.user, {
          role: response.data.role,
        });
        localStorage.setItem("user-details", JSON.stringify(user));
        localStorage.setItem("token", response.data.token);
      }
      callback();
      if (response.data?.message) {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          showCloseButton: true,
          cancelButtonText: 'Ok',
          html: `<p>${response.data.message}</p>`,
        })
      }
    }
  } catch (error: any) {
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
    case actions.CLEAR_USER: {
      return {
        ...state,
        userData: {
          fName: "",
          lName: "",
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

export default signUpReducer