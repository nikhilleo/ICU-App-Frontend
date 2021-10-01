import Typography from 'components/Typography'
import React, { useEffect, useState } from 'react'
import Loader from 'components/Loader'
import DashboardWrapper from 'components/DashboardWrapper'
import MonthWiseDays, { DaysWiseTime } from 'components/MonthWiseDays'
import Swal from 'sweetalert2'
import Button from 'components/Button'
import { connect } from 'react-redux'
import { getLocalStorageItem } from 'utils/helper'
import { GetPatientDetailsByTime, AddPatientDetailsByTime } from 'redux/patient'
import axios from '../../../axios'
import SUMMARY from 'components/SUMMARY'
import Average from 'components/Average'

function PatientReportDetails({ router, setPreLoader, GetPatientDetailsByTime, AddPatientDetailsByTime, isLoggedIn }: any) {
  const [data, setData]: any = useState();
  const [days, setDays]: any[] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const currentDate = new Date()
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const [dateTest, setDateTest]: any = useState(new Date(year, month, 1));
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const morningBatch = ["12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"]
  const eveningBatch = ["12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"]
  var currentTime = currentDate.getHours();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/");
      return;
    }
    const token = getLocalStorageItem("token");
    axios.get(`/patient/getPatient/${router.query.id}`, {
      headers: { Authorization: token },
    })
      .then((res: any) => {
        console.log(res.data)
        if (res.data.success) setData(res.data.patient)
      })
      .catch((err: any) => {
        console.log(err?.response || err)
      })
  }, [router.query.id])

  useEffect(() => {
    if (dateTest.getMonth() === month) {
      let copy = [...days]
      copy.push(String(new Date(dateTest)))
      setDays(copy)
      setDateTest(new Date(year, month, dateTest.getDate() + 1));
    }
  }, [dateTest])

  if (!data) return (
    <Loader />
  )

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

  const convertTime12to24 = (time12h: any) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");
    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  };

  const handleClick = () => {
    if(!selectedTime || !selectedDate) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        showCloseButton: true,
        cancelButtonText: 'Ok',
        html: `<p>Please select date and time before moving forward</p>`,
      })
      return
    }
    let date: any = new Date(selectedDate)
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();
    date = mm + '-' + dd + '-' + yyyy;
    const [time, modifier] = selectedTime.split(" ");
    let [hours, minutes] = time.split(":");
    let formattedTime = `${hours}${modifier.toLowerCase()}`
    if(parseInt(convertTime12to24(selectedTime).split(":")[0]) == currentTime && currentDate.getDate() == parseInt(selectedDate.split(" ")[2])) {
      AddPatientDetailsByTime(router.query.id, date, formattedTime, setPreLoader, () => {
        router.push(`/patient/patient-report-details/${router.query.id}`);
      })
    }
    else {
      GetPatientDetailsByTime(router.query.id, date, formattedTime, setPreLoader, () => {
        router.push(`/patient/patient-report-details/${router.query.id}`);
      });
    }
  }

  return (
    <Typography>
      <div className="default-container">
        <DashboardWrapper goBack={goBack} logout={logout}>
          <div className="w-100 justify-content-center row no-gutters align-items-center mt-4">
            <div style={{ maxWidth: "110px" }}>
              <img className="card-img " src={data.patinet_image ? data.patinet_image : "/Images/doctor.png"} alt="Patient Image" />
            </div>
            <div className="mt-3 ml-5">
              <p className="ml-4 d-flex   fs-20 lh-20">Patient Id :- {data._id}</p>
              <p className="ml-4 d-flex  fs-20 lh-20">Patient Name :- {`${data.fName} ${data.lName}`}</p>
              <p className="ml-4 d-flex  fs-20 lh-20">Age :- {data.age}</p>
              <p className="ml-4 d-flex  fs-20 lh-20">Sex :- {data.gender}</p>
            </div>
          </div> 
        </DashboardWrapper>
        <div className="w-100 p-4">
          <div className="d-flex py-1 small-text normal-black mb-3 ">
            <span>{`${months[month]} ${year}`}</span>
        
          </div>
          <div className="d-flex w-100 overflow-auto hide-scroll mt-3">
            {days?.length > 0 ? days.map((item: any) => (
              <MonthWiseDays
                onClick={() => setSelectedDate(item)}
                isSelected={selectedDate.split(" ")[2] == item.split(" ")[2]}
                day={item.split(" ")[0]}
                date={item.split(" ")[2]}
                disabled={currentDate.getDate() < item.split(" ")[2]}
                isActiveDate={currentDate.getDate() == item.split(" ")[2]}
              />
            )) : null}
          </div>
          <div className="d-flex py-1 small-text normal-black mb-3 justify-content-between align-items-center overflow-auto hide-scroll ">
            <span>First Batch</span>
              <div className="d-flex ">
              <SUMMARY />
              <Average/>
            </div>
          </div>
          <div className="row mt-3 ">
            {eveningBatch.map((item: any) => (
              <div className="col-md-3 ">
                <DaysWiseTime
                  onClick={() => { setSelectedTime(item) }}
                  disabled={parseInt(convertTime12to24(item).split(":")[0]) > currentTime}
                  time={item}
                  isSelected={selectedTime == item}
                />
              </div>
            ))}
          </div>
          <div className="d-flex py-1 small-text normal-black mb-3 justify-content-between align-items-center hide-scroll overflow-auto">
            <span>Second Batch</span>
              <div className="d-flex ">
              <SUMMARY />
              <Average/>
            </div>
          </div>
          <div className="row mt-3">
            {morningBatch.map((item: any) => {
              return (
                <div className="col-md-3">
                  <DaysWiseTime
                    disabled={parseInt(convertTime12to24(item).split(":")[0]) > currentTime}
                    onClick={() => { setSelectedTime(item) }}
                    time={item}
                    isSelected={selectedTime == item}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <div className="w-75 my-5 pb-4">
          <Button
            props={{
              type: "submit",
            }}
            onClick={handleClick}
          >
            Open Report Details
          </Button>
        </div>
      </div>
    </Typography>
  )
}

const mapStateToProps = (state: any, ownProps: any) => {
  const currentUserDetails = JSON.parse(getLocalStorageItem('user-details') || "{}");
  const isLoggedIn = Boolean(currentUserDetails && currentUserDetails.mobile)
  return {
    isLoggedIn,
  }
}

const mapDispatchToProps = {
  GetPatientDetailsByTime,
  AddPatientDetailsByTime
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientReportDetails);
