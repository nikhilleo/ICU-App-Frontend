import Typography from 'components/Typography'
import styles from './index.module.scss'
import React, { useState } from 'react'
import DashboardWrapper from 'components/DashboardWrapper'
import Swal from 'sweetalert2'
import Button from 'components/Button'
import Vitals from 'components/Vitals'
import Ventilator from 'components/Ventilator'
import ABG from 'components/ABG'
import INTAKE from 'components/INTAKE'
import OUTPUT from 'components/OUTPUT'
import DIABETICFLOW from 'components/DIABETICFLOW'


import ReportSelector from 'components/ReportSelect'
function PatientReportDetails({ router }: any) {
  const [data, setData]: any = useState();
  const [Reports, setReports] = useState("ReportsVitals");
  
  
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
        router.replace("/")
        Swal.fire(
          'Signed Out!',
        )
      }
    })
  }

  return (
    <Typography>
      <div className="default-container" >
        <DashboardWrapper goBack={goBack} logout={logout}>
          <div className="w-100 justify-content-center row no-gutters align-items-center mt-4">
            <div style={{ maxWidth: "110px" }}>
              <img className="card-img " src={data?.patinet_image ? data.patinet_image : "/Images/doctor.png"} alt="Patient Image" />
            </div>
            <div className="mt-3 ml-5">
              <p className="ml-4 d-flex   fs-20 lh-20">Patient Id :- {data?._id}</p>
              <p className="ml-4 d-flex  fs-20 lh-20">Patient Name :- {`${data?.fName} ${data?.lName}`}</p>
              <p className="ml-4 d-flex  fs-20 lh-20">Age :- {data?.age}</p>
              <p className="ml-4 d-flex  fs-20 lh-20">Sex :- {data?.gender}</p>
            </div>
          </div>
        </DashboardWrapper>

        <div className={`${styles.container1}`}>
          <div className={`${styles.scrollmenu} col-md-12`}>
            <div className={`${styles.Main} mt-2 d-flex hide-scroll `} >
              <a href="#" className={Reports === "ReportsVitals" ? styles.ActiveTab : ""}  onClick={() => setReports("ReportsVitals")}> V I T A L S</a>
              <a href="#" className={Reports === "ReportsVentilator" ? styles.ActiveTab : ""} onClick={() => setReports("ReportsVentilator")}>V E N T I L A T O R</a>
              <a href="#" className={Reports === "ReportsABG" ? styles.ActiveTab : ""} onClick={() => setReports("ReportsABG")}>A B G</a>
              <a href="#" className={Reports === "ReportsINTAKE" ? styles.ActiveTab : ""} onClick={() => setReports("ReportsINTAKE")}>I N T A K E</a>
              <a href="#" className={Reports === "ReportsOUTPUT" ? styles.ActiveTab : ""} onClick={() => setReports("ReportsOUTPUT")}>O U T P U T</a>
              <a href="#" className={Reports === "ReportsDIABETICFLOW" ? styles.ActiveTab : ""} onClick={() => setReports("ReportsDIABETICFLOW")}>D I A B E T I C  F L O W</a>
            </div>
          </div>
          <div className={`${styles.nnnn}`} >

            {Reports === "ReportsVitals" && <Vitals />}
            {Reports === "ReportsVentilator" && <Ventilator />}
            {Reports === "ReportsABG" && <ABG />}
            {Reports === "ReportsINTAKE" && <INTAKE />}
            {Reports === "ReportsOUTPUT" && <OUTPUT />}
            {Reports === "ReportsDIABETICFLOW" && <DIABETICFLOW />}
          </div>

        </div>
        <div className={`${styles.Submit} w-75 my-5   pb-4`}>
          <Button
            props={{
              type: "submit"
            }}
          >
            Open Report Details
          </Button>
        </div>
      </div>

    </Typography>
  )
}

export default PatientReportDetails
