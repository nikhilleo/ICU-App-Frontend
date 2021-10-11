import Typography from 'components/Typography'
import styles from './index.module.scss'
import React, { useEffect, useState } from 'react'
import DashboardWrapper from 'components/DashboardWrapper'
import Swal from 'sweetalert2'
import Button from 'components/Button'
import Vitals from 'components/Vitals'
import Ventilator from 'components/Ventilator'
import ABG from 'components/ABG'
import INTAKE from 'components/INTAKE'
import OUTPUT from 'components/OUTPUT'
import DIABETICFLOW from 'components/DIABETICFLOW'
import DOSES from 'components/DOSES'
import {
  submitVitalsDetails,
  validateVitalsData,
  setReportTab,
  validateVentilatorData,
  submitVentilatorDetails,
  validateABGData,
  submitABGDetails,
  validateIntakeData,
  submitIntakeDetails,
  validateOutputData,
  validateDiabeticFlowData,
  submitDiabeticFlowDetails,
  submitDosesDetails,
  submitOutputDetails,
} from 'redux/patient'
import { connect } from 'react-redux'
import { getLocalStorageItem } from 'utils/helper'
import axios from '../../../axios'

function PatientReportDetails({
  router,
  setPreLoader,
  validateVitalsData,
  submitVitalsDetails,
  validateVentilatorData,
  submitVentilatorDetails,
  validateABGData,
  submitABGDetails,
  validateIntakeData,
  submitIntakeDetails,
  validateOutputData,
  submitOutputDetails,
  validateDiabeticFlowData,
  submitDiabeticFlowDetails,
  submitDosesDetails,
  currentReportTab,
  setReportTab,
  disabled
}: any) {
  const [data, setData]: any = useState();
  const id = getLocalStorageItem("patient-id");

  useEffect(() => {
    const id = getLocalStorageItem("patient-id")
    const token = getLocalStorageItem("token")
    setPreLoader(true);
    axios.get(`/patient/getPatient/${id}`, {
      headers: { Authorization: token },
    })
      .then((res: any) => {
        setPreLoader(false);
        if (res.data.success) setData(res.data.patient)
      })
      .catch((err: any) => {
        setPreLoader(false);
        router.replace("/")
        Swal.fire({
          title: 'Error',
          icon: 'error',
          showCloseButton: true,
          cancelButtonText: 'Ok',
          html: `<p>Something went wrong. Please try again</p>`,
        })
      })
  }, [])

  useEffect(() => {
    const element: any = document.getElementById(currentReportTab);
    if(element) {
      element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
  }, [currentReportTab])

  const goBack = () => {
    router.back();
  }

  const logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You're about to signed out!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, sign out!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        router.replace("/nurse/login")
        Swal.fire(
          'Signed Out!',
        )
      }
    })
  }

  const handleClick = () => {
    switch (currentReportTab) {
      case "ReportsVitals":
        if (validateVitalsData()) {
          submitVitalsDetails(setPreLoader, () => setReportTab("ReportsVentilator", 2));
        }
        break;
      case "ReportsVentilator":
        if (validateVentilatorData()) {
          submitVentilatorDetails(setPreLoader, () => setReportTab("ReportsABG", 3));
        }
        break;
      case "ReportsABG":
        if (validateABGData()) {
          submitABGDetails(setPreLoader, () => setReportTab("ReportsINTAKE", 4));
        }
        break;
      case "ReportsINTAKE":
        if (validateIntakeData()) {
          submitIntakeDetails(setPreLoader, () => setReportTab("ReportsOUTPUT", 5));
        }
        break;
      case "ReportsOUTPUT":
        if (validateOutputData()) {
          submitOutputDetails(setPreLoader, () => setReportTab("ReportsDIABETICFLOW", 6));
        }
        break;
      case "ReportsDIABETICFLOW":
        if (validateDiabeticFlowData()) {
          submitDiabeticFlowDetails(setPreLoader, () => setReportTab("ReportsDOSES", 7));
        }
        break;
      case "ReportsDOSES":
        submitDosesDetails(setPreLoader, () => {
          setReportTab("ReportsVitals", 1);
          router.replace(`/patient/patient-details/${id}`);
        })
        break;
      default:
        break;
    }
  }

  return (
    <Typography>
      <div className="default-container" >
        <DashboardWrapper goBack={goBack} logout={logout}>
          <div className="w-100 justify-content-center row no-gutters align-items-center mt-4">
            <div style={{ maxWidth: "110px" }}>
              <img className="card-img " src={data?.patinet_image ? data.patinet_image : "/Images/doctor.png"} alt="Patient Image" />
            </div>
            <div className="mt-3 ml-5 overflow-hidden">
              <p className="ml-4 d-flex  fs-20 lh-20">Patient Id :- {data?._id || ""}</p>
              <p className="ml-4 d-flex  fs-20 lh-20">Patient Name :- {`${data?.fName || ""} ${data?.lName || ""}`}</p>
              <p className="ml-4 d-flex  fs-20 lh-20">Age :- {data?.age || ""}</p>
              <p className="ml-4 d-flex  fs-20 lh-20">Sex :- {data?.gender || ""}</p>
            </div>
          </div>
        </DashboardWrapper>
        <div className={`${styles.container1}`}>
          <div className={`${styles.scrollmenu} col-md-12`}>
            <div className={`${styles.Main} mt-2 d-flex hide-scroll `} >
              <a
                id="ReportsVitals"
                className={currentReportTab === "ReportsVitals" ? styles.ActiveTab : ""}
                onClick={() => setReportTab("ReportsVitals", 1)}
              > V I T A L S
              </a>
              <a
                id="ReportsVentilator"
                className={currentReportTab === "ReportsVentilator" ? styles.ActiveTab : ""}
                onClick={() => setReportTab("ReportsVentilator", 2)}
              >
                V E N T I L A T O R
              </a>
              <a
                id="ReportsABG"
                className={currentReportTab === "ReportsABG" ? styles.ActiveTab : ""}
                onClick={() => setReportTab("ReportsABG", 3)}
              >
                A B G
              </a>
              <a
                id="ReportsINTAKE"
                className={currentReportTab === "ReportsINTAKE" ? styles.ActiveTab : ""}
                onClick={() => setReportTab("ReportsINTAKE", 4)}
              >
                I N T A K E
              </a>
              <a
                id="ReportsOUTPUT"
                className={currentReportTab === "ReportsOUTPUT" ? styles.ActiveTab : ""}
                onClick={() => setReportTab("ReportsOUTPUT", 5)}
              >
                O U T P U T
              </a>
              <a
                id="ReportsDIABETICFLOW"
                className={currentReportTab === "ReportsDIABETICFLOW" ? styles.ActiveTab : ""}
                onClick={() => setReportTab("ReportsDIABETICFLOW", 6)}
              >
                D I A B E T I C  F L O W
              </a>
              <a
                id="ReportsDOSES"
                className={currentReportTab === "ReportsDOSES" ? styles.ActiveTab : ""}
                onClick={() => setReportTab("ReportsDOSES", 7)}
              >
                D O S E S 
              </a>
            </div>
          </div>
          <div className={`${styles.nnnn}`}>
            {currentReportTab === "ReportsVitals" && <Vitals />}
            {currentReportTab === "ReportsVentilator" && <Ventilator />}
            {currentReportTab === "ReportsABG" && <ABG />}
            {currentReportTab === "ReportsINTAKE" && <INTAKE />}
            {currentReportTab === "ReportsOUTPUT" && <OUTPUT />}
            {currentReportTab === "ReportsDIABETICFLOW" && <DIABETICFLOW />}
            {currentReportTab === "ReportsDOSES" && <DOSES />}
          </div>
        </div>
        <div className={`${styles.Submit} w-75 my-5   pb-4`}>
          <Button
            props={{
              type: "submit",
              disabled: disabled
            }}
            onClick={handleClick}
          >
            Next
          </Button>
        </div>
      </div>
    </Typography>
  )
}

const mapStateToProps = (state: any, ownProps: any) => {
  const currentUserDetails = JSON.parse(getLocalStorageItem('user-details') || "{}");
  const isLoggedIn = Boolean(currentUserDetails && currentUserDetails.mobile)
  const { currentReportTab, patientReportDetails } = state.patient
  return {
    isLoggedIn,
    currentReportTab,
    disabled: patientReportDetails.disabled
  }
}

const mapDispatchToProps = {
  validateVitalsData,
  submitVitalsDetails,
  validateVentilatorData,
  submitVentilatorDetails,
  validateABGData,
  submitABGDetails,
  validateIntakeData,
  submitIntakeDetails,
  validateOutputData,
  submitOutputDetails,
  validateDiabeticFlowData,
  submitDiabeticFlowDetails,
  submitDosesDetails,
  setReportTab,
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientReportDetails);
