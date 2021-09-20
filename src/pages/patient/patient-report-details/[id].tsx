import Typography from 'components/Typography'
import React, { Component, useEffect, useRef, useState } from 'react'
import Loader from 'components/Loader'
import DashboardWrapper from 'components/DashboardWrapper'
import MonthWiseDays, { DaysWiseTime } from 'components/MonthWiseDays'
import Swal from 'sweetalert2'
import Button from 'components/Button'

// useEffect(() => {
// const token = getLocalStorageItem("token")
// const userDetails = JSON.parse(getLocalStorageItem("user-details") || "");
// axios.get(`/patient/getPatient/${router.query.id}`, {
//   headers: { Authorization: token, role: userDetails.role },
// })
//   .then((res: any) => {
//     if (res.data.success) setData(res.data.patient)
//   }) 
//   .catch((err: any) => {
//   })
// }, [])

function PatientReportDetails({ router }: any) {
  const [data, setData]: any = useState({});
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

  if (!data) return (
    <Loader />
  )

  useEffect(() => {
    if (dateTest.getMonth() === month) {
      let copy = [...days]
      copy.push(String(new Date(dateTest)))
      setDays(copy)
      setDateTest(new Date(year, month, dateTest.getDate() + 1));
    }
  }, [dateTest])

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
   
  var convertedTime = convertTime12to24("01:00 PM");
  // disabled={parseInt(convertTime12to24(item.split(":"))) == parseInt(currentTime)}

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
          <div className="d-flex py-1 small-text normal-black mb-3">
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
          <div className="d-flex py-1 small-text normal-black mb-3">
            <span>First Batch</span>
          </div>
          <div className="row mt-3">
            {eveningBatch.map((item: any) => (
              <div className="col-md-3">
                <DaysWiseTime disabled={parseInt(convertTime12to24(item).split(":")[0]) > currentTime} time={item} />
              </div>
            ))}
          </div>
          <div className="d-flex py-1 small-text normal-black mb-3">
            <span>Second Batch</span>
          </div>
          <div className="row mt-3">
            {morningBatch.map((item: any) => {
              return (
                <div className="col-md-3">
                  <DaysWiseTime disabled={parseInt(convertTime12to24(item).split(":")[0]) > currentTime} onClick={() => { setSelectedTime(item) }} time={item} />
                </div>
              )
            })}
          </div>
        </div>
        <div className="w-75 my-5 pb-4">
          <Button
            props={{
              type: "submit"
            }}
          // onClick={handleClick}
          >
            Open Report Details
          </Button>
        </div>
      </div>
    </Typography>
  )
}

export default PatientReportDetails
