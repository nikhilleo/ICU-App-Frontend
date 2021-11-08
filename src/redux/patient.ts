import Swal from "sweetalert2"
import { getLocalStorageItem } from "utils/helper";
import axios from "../axios";

const initialState = {
  patientAddData: {
    fName: "",
    lName: "",
    mobile: "",
    age: "",
    gender: "",
    patient_image: "",
    diagnosisList: []
  },
  patientReportDetails: {
    IV_fluids: "",
    core: "",
    cvp: "",
    dbp: "",
    drain: "",
    drug_blouses: "",
    exp_mv: "",
    exp_tv: "",
    fio2: "",
    hco3: "",
    heart_rate: "",
    i_e: "",
    imv_set: "",
    infusion: "",
    inp_press_peak: "",
    inp_press_plat: "",
    insp: "",
    insuline: "",
    mbp: "",
    miscellaneous: "",
    mode: "",
    ng_rt: "",
    observed: "",
    pco2: "",
    peep_cpap: "",
    ph: "",
    po2: "",
    press_support: "",
    rr: "",
    rt: "",
    sat: "",
    sbp: "",
    set_mv: "",
    simv: "",
    skin: "",
    spo2: "",
    total: "",
    trigger_sens: "",
    uop: "",
    value: "",
  },
  currentReportTab: "ReportsVitals",
  successedTabCount: 0,
  error: {},
  prdErrors: {},
  patientDosesData: [],
  patientDosesError: {}
}

const actions = {
  SET_PATIENT: "patient/SET_PATIENT",
  CLEAR_PATIENT_DATA: "patient/CLEAR_PATIENT_DATA",
  SET_PATIENT_DIAGONASTIC_LIST: "patient/SET_PATIENT_DIAGONASTIC_LIST",
  CLEAR_PATIENT_DIAGONASTIC_LIST: "patient/CLEAR_PATIENT_DIAGONASTIC_LIST",
  SET_ERROR: "patient/SET_ERROR",
  SET_PRD: "patient/SET_PRD",
  CLEAR_PRD: "patient/CLEAR_PRD",
  SET_PRD_ERRORS: "patient/SET_PRD_ERRORS",
  SET_REPORT_TAB: "patient/SET_REPORT_TAB",
  SET_REPORT_SUCCESSED_TAB: "patient/SET_REPORT_SUCCESSED_TAB",
  SET_DOSE: "patient/SET_DOSE",
  DELETEADOSE: "patient/DELETEADOSE",
  UPDATE_PRD_DATA: "patient/UPDATE_PRD_DATA",
  UPDATE_DOSE: "patient/UPDATE_DOSE",
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
  } = getState().patient.patientAddData;

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
    const state = getState();
    const { patientAddData } = state.patient;
    const patientDetailsRequest = { ...patientAddData };
    delete patientDetailsRequest.patient_image;
    const response = await axios.post(url, patientDetailsRequest, { headers: { Authorization: token } });
    if (response.data.success && patientAddData.patient_image) {
      const data = new FormData();
      await data.append("image", patientAddData.patient_image);
      const img_response = await axios.post(
        `patient/uploadPatientImage/${response.data.patient._id}`,
        data,
        {
          headers: { Authorization: token, 'Content-Type': 'multipart/form-data' },
        },
      );
      setPreLoader(false)
      dispatch({
        type: actions.CLEAR_PATIENT_DATA,
      })
      if (img_response?.data?.message) {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          showCloseButton: true,
          cancelButtonText: 'Ok',
          html: `<p>${response.data.message}</p>`,
        })
        callback();
      }
    }
  } catch (error: any) {
    setPreLoader(false)
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

export const GetPatientDetailsByTime = (patient_id: string, date: string, time: string, loader = (loader: any) => { }, callback = () => { }) => async (dispatch: any, getState: any) => {
  try {
    if (!patient_id || !date || !time) {
      console.error("Invalid Parameters");
      return;
    }
    loader(true);
    const token = getLocalStorageItem("token")
    const res = await axios.get(
      `/time/getTime/${patient_id}/${date}/${time}`,
      { headers: { Authorization: token } }
    );
    loader(false);
    if (res.data.success) {
      const { data } = res.data;
      let newObj: any = {
        disabled: true,
      };
      if (data?.vitals_id) {
        const { dbp, mbp, sbp } = data.vitals_id.blood_pressure;
        const { cvp, heart_rate } = data.vitals_id;
        newObj = {
          ...newObj,
          cvp,
          heart_rate,
          dbp,
          mbp,
          sbp
        }
      }
      if (data?.ventilator_id) {
        const { ...rest } = data.ventilator_id;
        const { ...mv } = rest.mv;
        const { ...rate } = rest.rate
        const { ...temp } = rest.temp
        const { ...tv } = rest.tv
        delete rest["mv"];
        delete rest["rate"];
        delete rest["temp"];
        delete rest["tv"];
        newObj = {
          ...newObj,
          ...rest,
          ...mv,
          ...rate,
          ...temp,
          ...tv
        }
      }
      if (data?.abg_id) {
        const { ...rest } = data.abg_id;
        newObj = {
          ...newObj,
          ...rest
        }
      }
      if (data?.input_id) {
        const { ...rest } = data.input_id;
        newObj = {
          ...newObj,
          ...rest
        }
      }
      if (data?.output_id) {
        const { ...rest } = data.output_id;
        newObj = {
          ...newObj,
          ...rest
        }
      }
      if (data?.diabetic_flow_id) {
        const { ...rest } = data.diabetic_flow_id;
        newObj = {
          ...newObj,
          ...rest
        }
      }
      if (data?.doses_id && data.doses_id?.dose.length > 0) {
        dispatch({
          type: actions.UPDATE_DOSE,
          value: data.doses_id.dose
        })
      }
      dispatch({
        type: actions.UPDATE_PRD_DATA,
        value: newObj
      })
      callback();
    }
    else if (res.data?.message) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        showCloseButton: true,
        cancelButtonText: 'Ok',
        html: `<p>${res.data.message}</p>`,
      })
    }
  } catch (error: any) {
    loader(false);
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

export const AddPatientDetailsByTime = (patient_id: string, date: string, time: string, loader = (loader: any) => { }, callback = () => { }) => async (dispatch: any, getState: any) => {
  try {
    if (!patient_id || !date || !time) {
      console.error("Invalid Parameters");
      return;
    }
    loader(true);
    const token = getLocalStorageItem("token");
    const payload = {
      patient_id,
      "todays_date": date,
      "time_now": time
    };
    const res = await axios.post(
      `/time/addTime`,
      payload,
      { headers: { Authorization: token } }
    );
    loader(false);
    if (res.data.success) {
      if (res.data.message == "Time Already Exist") {
        localStorage.setItem("time_id", res.data.time_id._id);
        const { time_id: data } = res.data;
        let newObj: any = {
          successedTab: 0
        };
        if (data?.vitals_id) {
          const { dbp, mbp, sbp } = data.vitals_id.blood_pressure;
          const { cvp, heart_rate } = data.vitals_id;
          newObj = {
            ...newObj,
            cvp,
            heart_rate,
            dbp,
            mbp,
            sbp,
            successedTab: 1
          }
        }
        if (data?.ventilator_id) {
          const { ...rest } = data.ventilator_id;
          const { ...mv } = rest.mv;
          const { ...rate } = rest.rate
          const { ...temp } = rest.temp
          const { ...tv } = rest.tv
          delete rest["mv"];
          delete rest["rate"];
          delete rest["temp"];
          delete rest["tv"];
          newObj = {
            ...newObj,
            ...rest,
            ...mv,
            ...rate,
            ...temp,
            ...tv,
            successedTab: 2
          }
        }
        if (data?.abg_id) {
          const { ...rest } = data.abg_id;
          newObj = {
            ...newObj,
            ...rest,
            successedTab: 3
          }
        }
        if (data?.input_id) {
          const { ...rest } = data.input_id;
          newObj = {
            ...newObj,
            ...rest,
            successedTab: 4
          }
        }
        if (data?.output_id) {
          const { ...rest } = data.output_id;
          newObj = {
            ...newObj,
            ...rest,
            successedTab: 5
          }
        }
        if (data?.diabetic_flow_id) {
          const { ...rest } = data.diabetic_flow_id;
          newObj = {
            ...newObj,
            ...rest,
            successedTab: 6
          }
        }
        if (data?.doses_id && data.doses_id?.dose.length > 0) {
          newObj = {
            ...newObj,
            successedTab: 7
          }
          dispatch({
            type: actions.UPDATE_DOSE,
            value: data.doses_id.dose
          })
        }
        dispatch({
          type: actions.UPDATE_PRD_DATA,
          value: newObj
        })
        dispatch({
          type: actions.SET_REPORT_SUCCESSED_TAB,
          value: newObj.successedTab,
        })
      }
      else {
        localStorage.setItem("time_id", res.data.time_id);
        dispatch({
          type: actions.CLEAR_PRD
        })
      }
      callback();
    }
  } catch (error: any) {
    loader(false);
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

export const setPatientReportDetails = (e: any) => (dispatch: any, getState: any) => {
  let key = e.target.attributes.getNamedItem("data-redux-key").value;
  let value = e.target.value;
  if (parseInt(value) < 0) return null;
  dispatch({
    type: actions.SET_PRD,
    key,
    value
  })
}

export const setPRDError = (key: any, message: any) => ({
  type: actions.SET_PRD_ERRORS,
  key,
  message
})

export const validateVitalsData = () => (dispatch: any, getState: any) => {
  const { heart_rate, sbp, dbp, mbp, cvp } = getState().patient.patientReportDetails;
  if (!heart_rate) {
    dispatch(setPRDError('heart_rate', 'This is a required * field'));
    return false;
  }
  if (!sbp) {
    dispatch(setPRDError('sbp', 'This is a required * field'));
    return false;
  }
  if (!dbp) {
    dispatch(setPRDError('dbp', 'This is a required * field'));
    return false;
  }
  if (!mbp) {
    dispatch(setPRDError('mbp', 'This is a required * field'));
    return false;
  }
  if (!cvp) {
    dispatch(setPRDError('cvp', 'This is a required * field'));
    return false;
  }
  dispatch(setPRDError('', ''));
  return true;
}

export const submitVitalsDetails = (loader = (loader: any) => { }, callback = () => { }) => async (dispatch: any, getState: any) => {
  try {
    loader(true);
    const { heart_rate, sbp, dbp, mbp, cvp } = getState().patient.patientReportDetails;
    const time_id = getLocalStorageItem("time_id");
    const token = getLocalStorageItem("token");
    const payload = {
      time_id,
      heart_rate,
      "blood_pressure": {
        sbp,
        dbp,
        mbp
      },
      cvp
    };
    const res = await axios.post(
      "/vitals/addVitals",
      payload,
      { headers: { Authorization: token } }
    );
    if (res.data.success) {
      dispatch({
        type: actions.SET_REPORT_SUCCESSED_TAB,
        value: 1,
      })
      callback();
    }
    loader(false)
  } catch (error: any) {
    loader(false);
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

export const validateVentilatorData = () => (dispatch: any, getState: any) => {
  const {
    spo2,
    rr,
    skin,
    core,
    mode,
    imv_set,
    simv,
    observed,
    set_mv,
    exp_mv,
    insp,
    exp_tv,
    fio2,
    peep_cpap,
    press_support,
    inp_press_peak,
    inp_press_plat,
    trigger_sens,
    i_e
  } = getState().patient.patientReportDetails;
  if (!spo2) {
    dispatch(setPRDError('spo2', 'This is a required * field'));
    return false;
  }
  if (!rr) {
    dispatch(setPRDError('rr', 'This is a required * field'));
    return false;
  }
  if (!skin) {
    dispatch(setPRDError('skin', 'This is a required * field'));
    return false;
  }
  if (!core) {
    dispatch(setPRDError('core', 'This is a required * field'));
    return false;
  }
  if (!mode) {
    dispatch(setPRDError('mode', 'This is a required * field'));
    return false;
  }
  if (!imv_set) {
    dispatch(setPRDError('imv_set', 'This is a required * field'));
    return false;
  }
  if (!simv) {
    dispatch(setPRDError('simv', 'This is a required * field'));
    return false;
  }
  if (!observed) {
    dispatch(setPRDError('observed', 'This is a required * field'));
    return false;
  }
  if (!set_mv) {
    dispatch(setPRDError('set_mv', 'This is a required * field'));
    return false;
  }
  if (!exp_mv) {
    dispatch(setPRDError('exp_mv', 'This is a required * field'));
    return false;
  }
  if (!insp) {
    dispatch(setPRDError('insp', 'This is a required * field'));
    return false;
  }
  if (!exp_tv) {
    dispatch(setPRDError('exp_tv', 'This is a required * field'));
    return false;
  }
  if (!fio2) {
    dispatch(setPRDError('fio2', 'This is a required * field'));
    return false;
  }
  if (!i_e) {
    dispatch(setPRDError('i_e', 'This is a required * field'));
    return false;
  }
  if (!peep_cpap) {
    dispatch(setPRDError('peep_cpap', 'This is a required * field'));
    return false;
  }
  if (!press_support) {
    dispatch(setPRDError('press_support', 'This is a required * field'));
    return false;
  }
  if (!inp_press_peak) {
    dispatch(setPRDError('inp_press_peak', 'This is a required * field'));
    return false;
  }
  if (!inp_press_plat) {
    dispatch(setPRDError('inp_press_plat', 'This is a required * field'));
    return false;
  }
  if (!trigger_sens) {
    dispatch(setPRDError('trigger_sens', 'This is a required * field'));
    return false;
  }
  dispatch(setPRDError('', ''));
  return true;
}

export const submitVentilatorDetails = (loader = (loader: any) => { }, callback = () => { }) => async (dispatch: any, getState: any) => {
  try {
    loader(true);
    const {
      spo2,
      rr,
      skin,
      core,
      mode,
      imv_set,
      simv,
      observed,
      set_mv,
      exp_mv,
      insp,
      exp_tv,
      fio2,
      peep_cpap,
      press_support,
      inp_press_peak,
      inp_press_plat,
      trigger_sens,
      i_e
    } = getState().patient.patientReportDetails;
    const time_id = getLocalStorageItem("time_id");
    const token = getLocalStorageItem("token");
    const payload = {
      time_id,
      spo2,
      rr,
      "temp": {
        skin,
        core
      },
      mode,
      "rate": {
        imv_set,
        simv,
        observed
      },
      "mv": {
        set_mv,
        exp_mv
      },
      "tv": {
        insp,
        exp_tv
      },
      fio2,
      peep_cpap,
      press_support,
      inp_press_peak,
      inp_press_plat,
      trigger_sens,
      i_e: isNaN(i_e) ? i_e : "01:0" + i_e
    };
    const res = await axios.post(
      "/ventilator/addVentilatorValues",
      payload,
      { headers: { Authorization: token } }
    );
    if (res.data.success) {
      dispatch({
        type: actions.SET_REPORT_SUCCESSED_TAB,
        value: 2,
      })
      callback();
    }
    loader(false)
  } catch (error: any) {
    loader(false);
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

export const validateABGData = () => (dispatch: any, getState: any) => {
  const {
    ph,
    pco2,
    po2,
    hco3,
    sat,
  } = getState().patient.patientReportDetails;
  if (!ph) {
    dispatch(setPRDError('ph', 'This is a required * field'));
    return false;
  }
  if (!pco2) {
    dispatch(setPRDError('pco2', 'This is a required * field'));
    return false;
  }
  if (!po2) {
    dispatch(setPRDError('po2', 'This is a required * field'));
    return false;
  }
  if (!hco3) {
    dispatch(setPRDError('hco3', 'This is a required * field'));
    return false;
  }
  if (!sat) {
    dispatch(setPRDError('sat', 'This is a required * field'));
    return false;
  }
  dispatch(setPRDError('', ''));
  return true;
}

export const submitABGDetails = (loader = (loader: any) => { }, callback = () => { }) => async (dispatch: any, getState: any) => {
  try {
    loader(true);
    const {
      ph,
      pco2,
      po2,
      hco3,
      sat,
    } = getState().patient.patientReportDetails;
    const time_id = getLocalStorageItem("time_id");
    const token = getLocalStorageItem("token");
    const payload = {
      time_id,
      ph,
      pco2,
      po2,
      hco3,
      sat,
    };
    const res = await axios.post(
      "/abg/addABG",
      payload,
      { headers: { Authorization: token } }
    );
    if (res.data.success) {
      dispatch({
        type: actions.SET_REPORT_SUCCESSED_TAB,
        value: 3,
      })
      callback();
    }
    loader(false)
  } catch (error: any) {
    loader(false);
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

export const validateIntakeData = () => (dispatch: any, getState: any) => {
  const {
    IV_fluids,
    rt,
    drug_blouses,
    infusion,
    miscellaneous,
  } = getState().patient.patientReportDetails;
  if (!IV_fluids) {
    dispatch(setPRDError('IV_fluids', 'This is a required * field'));
    return false;
  }
  if (!rt) {
    dispatch(setPRDError('rt', 'This is a required * field'));
    return false;
  }
  if (!drug_blouses) {
    dispatch(setPRDError('drug_blouses', 'This is a required * field'));
    return false;
  }
  if (!infusion) {
    dispatch(setPRDError('infusion', 'This is a required * field'));
    return false;
  }
  if (!miscellaneous) {
    dispatch(setPRDError('miscellaneous', 'This is a required * field'));
    return false;
  }
  dispatch(setPRDError('', ''));
  return true;
}

export const submitIntakeDetails = (loader = (loader: any) => { }, callback = () => { }) => async (dispatch: any, getState: any) => {
  try {
    loader(true);
    const {
      IV_fluids,
      rt,
      drug_blouses,
      infusion,
      miscellaneous,
    } = getState().patient.patientReportDetails;
    const time_id = getLocalStorageItem("time_id");
    const token = getLocalStorageItem("token");
    const payload = {
      time_id,
      IV_fluids,
      rt,
      drug_blouses,
      infusion,
      miscellaneous,
    };
    const res = await axios.post(
      "/input/addInput",
      payload,
      { headers: { Authorization: token } }
    );
    if (res.data.success) {
      dispatch({
        type: actions.SET_REPORT_SUCCESSED_TAB,
        value: 4,
      })
      callback();
    }
    loader(false)
  } catch (error: any) {
    loader(false);
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

export const validateOutputData = () => (dispatch: any, getState: any) => {
  const {
    ng_rt,
    uop,
    drain,
  } = getState().patient.patientReportDetails;
  if (!ng_rt) {
    dispatch(setPRDError('ng_rt', 'This is a required * field'));
    return false;
  }
  if (!uop) {
    dispatch(setPRDError('uop', 'This is a required * field'));
    return false;
  }
  if (!drain) {
    dispatch(setPRDError('drain', 'This is a required * field'));
    return false;
  }
  dispatch(setPRDError('', ''));
  return true;
}

export const submitOutputDetails = (loader = (loader: any) => { }, callback = () => { }) => async (dispatch: any, getState: any) => {
  try {
    loader(true);
    const {
      ng_rt,
      uop,
      drain,
    } = getState().patient.patientReportDetails;
    const time_id = getLocalStorageItem("time_id");
    const token = getLocalStorageItem("token");
    const payload = {
      time_id,
      ng_rt,
      uop,
      drain,
    };
    const res = await axios.post(
      "/output/addOutput",
      payload,
      { headers: { Authorization: token } }
    );
    if (res.data.success) {
      dispatch({
        type: actions.SET_REPORT_SUCCESSED_TAB,
        value: 5,
      })
      callback();
    }
    loader(false)
  } catch (error: any) {
    loader(false);
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

export const validateDiabeticFlowData = () => (dispatch: any, getState: any) => {
  const {
    insuline,
    value
  } = getState().patient.patientReportDetails;
  if (!insuline) {
    dispatch(setPRDError('insuline', 'This is a required * field'));
    return false;
  }
  if (!value) {
    dispatch(setPRDError('value', 'This is a required * field'));
    return false;
  }
  dispatch(setPRDError('', ''));
  return true;
}
export const validateReportsHUMANBODY = () => (dispatch: any, getState: any) => {
  const {
    insuline,
    value
  } = getState().patient.patientReportDetails;
  if (!insuline) {
    dispatch(setPRDError('insuline', 'This is a required * field'));
    return false;
  }
  if (!value) {
    dispatch(setPRDError('value', 'This is a required * field'));
    return false;
  }
  dispatch(setPRDError('', ''));
  return true;
}

export const submitReportsHUMANBODY = (loader = (loader: any) => { }, callback = () => { }) => async (dispatch: any, getState: any) => {
  try {
    loader(true);
    const {
      insuline,
      value
    } = getState().patient.patientReportDetails;
    const time_id = getLocalStorageItem("time_id");
    const token = getLocalStorageItem("token");
    const payload = {
      time_id,
      insuline,
      value
    };
    const res = await axios.post(
      "/diabeticFlow/addDiabeticFlow",
      payload,
      { headers: { Authorization: token } }
    );
    if (res.data.success) {
      dispatch({
        type: actions.SET_REPORT_SUCCESSED_TAB,
        value: 6,
      })
      callback();
    }
    loader(false)
  } catch (error: any) {
    loader(false);
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




export const submitDiabeticFlowDetails = (loader = (loader: any) => { }, callback = () => { }) => async (dispatch: any, getState: any) => {
  try {
    loader(true);
    const {
      insuline,
      value
    } = getState().patient.patientReportDetails;
    const time_id = getLocalStorageItem("time_id");
    const token = getLocalStorageItem("token");
    const payload = {
      time_id,
      insuline,
      value
    };
    const res = await axios.post(
      "/diabeticFlow/addDiabeticFlow",
      payload,
      { headers: { Authorization: token } }
    );
    if (res.data.success) {
      dispatch({
        type: actions.SET_REPORT_SUCCESSED_TAB,
        value: 6,
      })
      callback();
    }
    loader(false)
  } catch (error: any) {
    loader(false);
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

export const setDoses = (data: object) => (dispatch: any, getState: any) => {
  if (!data) {
    console.error("Invalid Parameters");
  }
  dispatch({
    type: actions.SET_DOSE,
    value: data
  })
}

export const submitDosesDetails = (loader = (loader: any) => { }, callback = () => { }) => async (dispatch: any, getState: any) => {
  try {
    loader(true);
    const data = getState().patient.patientDosesData;
    const time_id = getLocalStorageItem("time_id");
    const payload = {
      time_id,
      dose: data
    }
    const token = getLocalStorageItem("token");
    const res = await axios.post(
      "/doses/addDoses",
      payload,
      { headers: { Authorization: token } }
    );
    if (res.data.success) {
      dispatch({
        type: actions.CLEAR_PRD,
      })
      Swal.fire({
        title: 'Success',
        icon: 'success',
        showCloseButton: true,
        cancelButtonText: 'Ok',
        html: `<p>Patient Report Updated!</p>`,
      })
      callback();
    }
    loader(false)
  } catch (error: any) {
    loader(false);
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

export const deleteADose = (id: any) => (dispatch: any, getState: any) => {
  dispatch({
    type: actions.DELETEADOSE,
    value: id
  })
}

export const setReportTab = (value: string, currentTabPosition: number) => (dispatch: any, getState: any) => {
  const { successedTabCount, patientReportDetails } = getState().patient;
  if (patientReportDetails.disabled || currentTabPosition - 1 == successedTabCount || currentTabPosition <= successedTabCount) {
    dispatch({
      type: actions.SET_REPORT_TAB,
      value,
    })
  }
  else {
    Swal.fire({
      title: 'Error',
      icon: 'error',
      showCloseButton: true,
      cancelButtonText: 'Ok',
      html: `<p>Please submit current form details to proceed!</p>`,
    })
  }
}

export const submitSummaryDetails = async (
  id: any,
  currentDate: any,
  data: any,
  batch: any,
  setPreLoader = (loader: any) => { },
  callback = () => { }
) => {
  try {
    let date: any = new Date(currentDate)
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();
    date = mm + '-' + dd + '-' + yyyy;
    const { doctor_name, summary } = data
    const payload = {
      patient_id: id,
      todays_date: date,
      shift: batch,
      doctor_name,
      summary
    }
    const token = getLocalStorageItem("token");
    setPreLoader(true)
    const res = await axios.post(
      "/summary/addSummary",
      payload,
      { headers: { Authorization: token } }
    );
    setPreLoader(false)
    if (res.data.success) {
      if (res.data?.message) {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          showCloseButton: true,
          cancelButtonText: 'Ok',
          html: `<p>${res.data.message}</p>`,
        })
      }
      callback();
    }
  } catch (error: any) {
    if (error.response?.data?.message) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        showCloseButton: true,
        cancelButtonText: 'Ok',
        html: `<p>${error.response?.data?.message}</p>`,
      })
    }
  }  
}

export const getAverge = async (
  id: any,
  currentDate: any,
  setPreLoader = (loader: any) => { },
  callback = (data: any) => { }
) => {
  try {
    let date: any = new Date(currentDate)
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();
    date = mm + '-' + dd + '-' + yyyy;
    setPreLoader(true)
    const token = getLocalStorageItem("token");
    const res = await axios.get(`average/getFullDayAverage/${id}/${date}`,
      { headers: { Authorization: token } }
    );
    if (res.data.success) callback(res.data.balance);
    setPreLoader(false)
  } catch (error: any) {
    setPreLoader(false)
    Swal.fire({
      title: 'Error',
      icon: 'error',
      showCloseButton: true,
      cancelButtonText: 'Ok',
      html: `<p>${error.response?.data?.message || "Something Went Wrong"}</p>`,
    })
  }
}

export const getSummary = async (
  id: any,
  currentDate: any,
  batch: string,
  setPreLoader = (loader: any) => { },
  callback = (data: any) => { }
) => {
  try {
    let date: any = new Date(currentDate)
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();
    date = mm + '-' + dd + '-' + yyyy;
    setPreLoader(true)
    const token = getLocalStorageItem("token");
    const res = await axios.get(`summary/getSummary/${id}/${date}/${batch}`,
      { headers: { Authorization: token } }
    );
    callback(res.data);
    setPreLoader(false)
  } catch (error: any) {
    setPreLoader(false)
  }
}

const PatientReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.SET_PATIENT: {
      return {
        ...state,
        patientAddData: {
          ...state.patientAddData,
          [action.key]: Array.isArray(action.value) ? [...action.value] : action.value
        }
      }
    }
    case actions.CLEAR_PATIENT_DATA: {
      return {
        ...state,
        patientAddData: {
          fName: "",
          lName: "",
          mobile: "",
          age: "",
          gender: "",
          patient_image: "",
          diagnosisList: []
        }
      }
    }
    case actions.SET_PATIENT_DIAGONASTIC_LIST: {
      return {
        ...state,
        patientAddData: {
          ...state.patientAddData,
          [action.key]: [
            ...state.patientAddData.diagnosisList,
            action.value
          ]
        }
      }
    }
    case actions.CLEAR_PATIENT_DIAGONASTIC_LIST: {
      return {
        ...state,
        patientAddData: {
          ...state.patientAddData,
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
    case actions.SET_PRD: {
      return {
        ...state,
        patientReportDetails: {
          ...state.patientReportDetails,
          [action.key]: action.value
        }
      }
    }
    case actions.UPDATE_PRD_DATA: {
      return {
        ...state,
        patientReportDetails: {
          ...action.value
        },
      }
    }
    case actions.CLEAR_PRD: {
      return {
        ...state,
        patientReportDetails: {
          IV_fluids: "",
          core: "",
          cvp: "",
          dbp: "",
          drain: "",
          drug_blouses: "",
          exp_mv: "",
          exp_tv: "",
          fio2: "",
          hco3: "",
          heart_rate: "",
          i_e: "",
          imv_set: "",
          infusion: "",
          inp_press_peak: "",
          inp_press_plat: "",
          insp: "",
          insuline: "",
          mbp: "",
          miscellaneous: "",
          mode: "",
          ng_rt: "",
          observed: "",
          pco2: "",
          peep_cpap: "",
          ph: "",
          po2: "",
          press_support: "",
          rr: "",
          rt: "",
          sat: "",
          sbp: "",
          set_mv: "",
          simv: "",
          skin: "",
          spo2: "",
          total: "",
          trigger_sens: "",
          uop: "",
          value: "",
        },
        currentReportTab: "ReportsVitals",
        successedTabCount: 0,
        error: {},
        prdErrors: {},
        patientDosesData: [],
        patientDosesError: {}
      }
    }
    case actions.SET_PRD_ERRORS: {
      return {
        ...state,
        prdErrors: {
          [action.key]: action.message || {}
        }
      }
    }
    case actions.SET_REPORT_TAB: {
      return {
        ...state,
        currentReportTab: action.value
      }
    }
    case actions.SET_REPORT_SUCCESSED_TAB: {
      return {
        ...state,
        successedTabCount: action.value
      }
    }
    case actions.SET_DOSE: {
      return {
        ...state,
        patientDosesData: [
          ...state.patientDosesData,
          ...[action.value]
        ]
      }
    }
    case actions.UPDATE_DOSE: {
      return {
        ...state,
        patientDosesData: [
          ...action.value
        ]
      }
    }
    case actions.DELETEADOSE: {
      let arr = [...state.patientDosesData]
      arr.splice(action.value, 1);
      return {
        ...state,
        patientDosesData: [...arr]
      }
    }
    default: return state;
  }
}

export default PatientReducer
