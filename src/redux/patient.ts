import Swal from "sweetalert2"
import { getLocalStorageItem } from "utils/helper";
import axios from "../axios";

const initialState = {
  patientData: {
    fName: "",
    lName: "",
    mobile: "",
    age: "",
    gender: "",
    patient_image: "",
    diagnosisList: []
  },
  error: {}
}

const actions = {
  SET_PATIENT: "patient/SET_PATIENT",
  SET_PATIENT_DIAGONASTIC_LIST: "patient/SET_PATIENT_DIAGONASTIC_LIST",
  CLEAR_PATIENT_DIAGONASTIC_LIST: "patient/CLEAR_PATIENT_DIAGONASTIC_LIST",
  SET_ERROR: "patient/SET_ERROR",
  CLEAR_ERROR: "patient/CLEAR_ERROR"
}

export const setPatientFormError = (key: any, message: any) => ({
  type: actions.SET_ERROR,
  key,
  message
})

export const setPatientDataHelper = (key: any, value: any) => (dispatch: any, getState: any) => {
  dispatch({
    type: actions.SET_PATIENT,
    key,
    value
  })
}

export const setDiagonasticList = (key: any, value: any) => (dispatch: any, getState: any) => {
  dispatch({
    type: actions.SET_PATIENT_DIAGONASTIC_LIST,
    key,
    value
  })
}

export const clearDiagonasticList = (key: any) => (dispatch: any, getState: any) => {
  dispatch({
    type: actions.CLEAR_PATIENT_DIAGONASTIC_LIST,
    key,
    
  })
}

export const validatePatientData = () => (dispatch: any, getState: any) => {
  const {
    fName,
    lName,
    mobile,
    age,
    gender,
    diagnosisList
  } = getState().patient.patientData;
  
  if (!fName) {
    dispatch(setPatientFormError('add-patient-firstname', 'This is a required * field'));
    return false;
  };
  if (!lName) {
    dispatch(setPatientFormError('add-patient-lastname', 'This is a required * field'));
    return false;
  };
  if (!mobile) {
    dispatch(setPatientFormError('add-patient-mobile', 'This is a required * field'));
    return false;
  } else if (mobile.length !== 10) {
    dispatch(setPatientFormError('add-patient-mobile', 'mobile length must be at least 10 characters long'));
    return false;
  }
  if (!age) {
    dispatch(setPatientFormError('add-patient-age', 'This is a required * field'));
    return false;
  }
  if (!gender) {
    dispatch(setPatientFormError('add-patient-gender', 'This is a required * field'));
    return false;
  }
  if (diagnosisList.length < 1) {
    dispatch(setPatientFormError('add-patient-dignosis-list', 'This is a required * field'));
    return false;
  }
  dispatch(setPatientFormError('', ''));
  return true;
}

export const setPatientData = (e: any) => (dispatch: any, getState: any) => {
  let key = e.target.attributes.getNamedItem("data-state-key").value;
  let value = e.target.value;
  dispatch(setPatientDataHelper(key, value))
}

export const PatientAddProcess = (url: any, setPreLoader: any, callback: any) => async (dispatch: any, getState: any) => {
  try {
    setPreLoader(true)
    const token = getLocalStorageItem("token")
    console.log(token)
    let userDetails = JSON.parse(getLocalStorageItem('user-details') || "{}");
    const state = getState();
    const { patientData } = state.patient;
    const patientDetailsRequest = {...patientData};
    delete patientDetailsRequest.patient_image;
    const response = await axios.post(url, patientDetailsRequest, { headers: { Authorization: token, role: userDetails.role } });
    console.log(response)
    if(response.data.success && patientData.patient_image) {
      console.log(patientData.patient_image)
      const data = new FormData();
      await data.append("image", patientData.patient_image);
      console.log(response.data.patient._id)
      const img_response = await axios.post(
        `patient/uploadPatientImage/${response.data.patient._id}`,
        data,
        {
          headers: { Authorization: token, role: userDetails.role, 'Content-Type': 'multipart/form-data' },
        },
      );
      console.log(img_response)
      setPreLoader(false)
    }
      if (response?.data?.message) {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          showCloseButton: true,
          cancelButtonText: 'Ok',
          html: `<p>${response.data.message}</p>`,
        })
        // callback();
      }
  } catch (error) {
    setPreLoader(false)
    console.log(error)
    console.log(error.response)
    if (error.response?.data?.message) {
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

const PatientReducer = (state = initialState, action: any) => {
  console.log(action)
  switch (action.type) {
    case actions.SET_PATIENT: {
      return {
        ...state,
        patientData: {
          ...state.patientData,
          [action.key]: Array.isArray(action.value) ? [...action.value] : action.value 
        }
      }
    }
    case actions.SET_PATIENT_DIAGONASTIC_LIST: {
      return {
        ...state,
        patientData: {
          ...state.patientData,
          [action.key]: [
            ...state.patientData.diagnosisList,
            action.value
          ]
        }
      }
    }
    case actions.CLEAR_PATIENT_DIAGONASTIC_LIST: {
      return {
        ...state,
        patientData: {
          ...state.patientData,
          [action.key]: []
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

export default PatientReducer