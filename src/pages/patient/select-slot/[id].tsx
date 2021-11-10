import Typography from 'components/Typography'
import React, { useEffect, useState } from 'react'
import DashboardWrapper from 'components/DashboardWrapper'
import MonthWiseDays, { DaysWiseTime } from 'components/MonthWiseDays'
import Swal from 'sweetalert2'
import Button from 'components/Button'
import { connect } from 'react-redux'
import { getLocalStorageItem } from 'utils/helper'
import { GetPatientDetailsByTime, AddPatientDetailsByTime, submitSummaryDetails, getAverge, getSummary, setPatientIntubedData } from 'redux/patient'
import axios from '../../../axios'
import SUMMARY from 'components/SUMMARY'
import Average from 'components/Average'
import styles from './index.module.scss'
import { MultiSelect } from 'react-multi-select-component'
const schedule = require('node-schedule');

function PatientReportDetails({ router, setPreLoader, GetPatientDetailsByTime, AddPatientDetailsByTime, isLoggedIn, setPatientIntubedData }: any) {
  const [data, setData]: any = useState();
  const [days, setDays]: any[] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [summaryMorningModel, setMorningModel] = useState(false)
  const [summaryEveningModel, setEveningModel] = useState(false)
  const [averageModel, setAverageModel] = useState(false)
  const [averageData, setAverageData] = useState({})
  const [MSData, setMSData] = useState()
  const [ESData, setESData] = useState()
  const currentDate = new Date()
  const year = currentDate.getFullYear();
  const [month, setMonth] = useState(currentDate.getMonth());
  const [dateTest, setDateTest]: any = useState(new Date(year, month, 1));
  const eveningBatch = ["12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"]
  const morningBatch = ["12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"]
  var [currentTime, setCurrentTime] = useState(currentDate.getHours());
  const id = getLocalStorageItem("patient-id");

  const updateDates = () => {
    if (dateTest.getMonth() === month) {
      let copy = [...days]
      copy.push(String(new Date(dateTest)))
      setDays(copy)
      setDateTest(new Date(year, month, dateTest.getDate() + 1));
      const a = String(new Date(dateTest)).split(" ")[2];
      const b = String(currentDate.getDate());
      if (parseInt(a) == parseInt(b)) {
        setSelectedDate(String(new Date(dateTest)))
      }
    }
    morningBatch.forEach((item) => {
      if (parseInt(convertTime12to24(item).split(":")[0]) == currentDate.getHours()) {
        setSelectedTime(item)
      }
    })
    eveningBatch.forEach((item) => {
      if (parseInt(convertTime12to24(item).split(":")[0]) == currentDate.getHours()) {
        setSelectedTime(item)
      }
    })
  }

  schedule.scheduleJob('0 * * * *', function () {
    updateDates();
    setCurrentTime(currentDate.getHours())
  });

  useEffect(() => {
    updateDates();
  }, [dateTest])

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/");
      return;
    }
    const token = getLocalStorageItem("token");
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
        Swal.fire({
          title: 'Error',
          icon: 'error',
          showCloseButton: true,
          cancelButtonText: 'Ok',
          html: `<p>Something went wrong. Please try again</p>`,
        })
        router.replace("/")
      })
  }, [])

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
    if (!selectedTime || !selectedDate) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        showCloseButton: true,
        cancelButtonText: 'Ok',
        html: `<p>Please select date and time before moving forward</p>`,
      })
      return
    }
    else if(month > currentDate.getMonth()) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        showCloseButton: true,
        cancelButtonText: 'Ok',
        html: `<p>Please select current month to fill data</p>`,
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
    if (parseInt(convertTime12to24(selectedTime).split(":")[0]) == currentTime &&
      currentDate.getDate() == parseInt(selectedDate.split(" ")[2]) &&
      month == currentDate.getMonth()) {
      AddPatientDetailsByTime(id, date, formattedTime, setPreLoader, () => {
        router.push(`/patient/patient-report-details/${id}`);
      })
    }
    else {
      GetPatientDetailsByTime(id, date, formattedTime, setPreLoader, () => {
        router.push(`/patient/patient-report-details/${id}`);
      });
    }
  }

  const renderDayWiseMonth = (item: any, index: any) => {
    return (
      <MonthWiseDays
        onClick={() => {
          setSelectedTime("")
          setSelectedDate(item)
        }}
        isSelected={selectedDate.split(" ")[2] == item.split(" ")[2] && month <= currentDate.getMonth()}
        day={item.split(" ")[0]}
        date={item.split(" ")[2]}
        disabled={month > currentDate.getMonth() || (currentDate.getDate() < item.split(" ")[2] && month == currentDate.getMonth())}
        key={`select-slot-month ${index}`}
      />
    )
  }

  const proccessSummaryData = (data: object, batch: string) => {
    submitSummaryDetails(id, selectedDate, data, batch, setPreLoader, () => {
      setEveningModel(false);
      setMorningModel(false);
    });
  }

  const onOpenAvgModal = () => {
    if(month > currentDate.getMonth()) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        showCloseButton: true,
        cancelButtonText: 'Ok',
        html: `<p>Please select month properly to get average</p>`,
      })
      return
    }
    getAverge(id, selectedDate, setPreLoader, (data: object) => {
      setAverageModel(true)
      setAverageData({ ...data })
    })
  }

  const onMorningModalOpen = () => {
    getSummary(id, selectedDate, "morning", setPreLoader, (res: any) => {
      if (res.success) {
        setMSData({ ...res.data[0] })
      }
      setMorningModel(true)
    }, () => {
      if (selectedDate.split(" ")[2] == currentDate.toString().split(" ")[2] && month == currentDate.getMonth()) {
        setMorningModel(true)
        return
      }
      Swal.fire({
        title: 'Error',
        icon: 'error',
        showCloseButton: true,
        cancelButtonText: 'Ok',
        html: `<p>No data found</p>`,
      })
    })
  }

  const onEveningModalOpen = () => {
    getSummary(id, selectedDate, "evening", setPreLoader, (res: any) => {
      if (res.success) {
        setESData({ ...res.data[0] })
      }
      setEveningModel(true)
    }, () => {
      if (selectedDate.split(" ")[2] == currentDate.toString().split(" ")[2] && month == currentDate.getMonth()) {
        if (currentDate.getHours() > 11) setEveningModel(true);
        else Swal.fire({
          title: 'Error',
          icon: 'error',
          showCloseButton: true,
          cancelButtonText: 'Ok',
          html: `<p>Cannot fill second batch data until it's 12 PM</p>`,
        })
        return
      }
      Swal.fire({
        title: 'Error',
        icon: 'error',
        showCloseButton: true,
        cancelButtonText: 'Ok',
        html: `<p>No data found</p>`,
      })
    })
  }

  const handleMonthChange = (e: any) => {
    setDays([])
    setDateTest(new Date(year, e.target.value, dateTest.getDate()))
    setMonth(parseInt(e.target.value))
    updateDates();
  }

  return (
    <Typography>
      <div className="default-container">
        <DashboardWrapper goBack={goBack} logout={logout}>
          <div className="w-100 justify-content-center row no-gutters align-items-center mt-4">
            <div style={{ maxWidth: "110px" }}>
              <img className="card-img " src={data?.patinet_image ? data.patinet_image : "/Images/doctor.png"} alt="Patient Image" />
            </div>
            <div className="mt-3 ml-5 overflow-hidden">
              <p className="ml-4 d-flex  fs-20 lh-20">Patient Name :- {`${data?.fName || ""} ${data?.lName || ""}`}</p>
              <p className="ml-4 d-flex  fs-20 lh-20">Age :- {data?.age || ""}</p>
              <p className="ml-4 d-flex  fs-20 lh-20">Sex :- {data?.gender || ""}</p>
            </div>
          </div>
        </DashboardWrapper>
        <div className="w-100 p-4">
          <div className="d-flex align-items-center justify-content-between py-1 small-text normal-black mb-3 ">
            {/* <span>{`${months[month]} ${year}`}</span> */}
            <div className="input-group w-50">
              <select onChange={handleMonthChange} className="custom-select" id="inputGroupSelect01">
                <option selected={month == 0} value='0'>Janaury</option>
                <option selected={month == 1} value='1'>February</option>
                <option selected={month == 2} value='2'>March</option>
                <option selected={month == 3} value='3'>April</option>
                <option selected={month == 4} value='4'>May</option>
                <option selected={month == 5} value='5'>June</option>
                <option selected={month == 6} value='6'>July</option>
                <option selected={month == 7} value='7'>August</option>
                <option selected={month == 8} value='8'>September</option>
                <option selected={month == 9} value='9'>October</option>
                <option selected={month == 10} value='10'>November</option>
                <option selected={month == 11} value='11'>December</option>
              </select>
            </div>
            <Average
              open={averageModel}
              openModal={onOpenAvgModal}
              closeModal={() => { setAverageModel(false) }}
              data={averageData}
            />
          </div>
          <div className="d-flex w-100 overflow-auto hide-scroll mt-3">
            {days?.length > 0 ? days.map(renderDayWiseMonth) : null}
          </div>
          <div className="d-flex py-1 small-text normal-black mb-3 justify-content-between align-items-center overflow-auto hide-scroll ">
            <span>First Batch</span>
            <div className="d-flex ">
              <SUMMARY
                open={summaryMorningModel}
                openModal={onMorningModalOpen}
                closeModal={() => { setMorningModel(false) }}
                onSave={(data: any) => { proccessSummaryData(data, "morning") }}
                data={MSData}
              />
            </div>
          </div>
          <div className="row mt-3 ">
            {morningBatch.map((item: any, index: any) => {
              return (
                <div key={`select-slot-morning ${index}`} className="col-md-3">
                  <DaysWiseTime
                    disabled={
                      (selectedDate.split(" ")[2] == String(currentDate).split(" ")[2] &&
                      parseInt(convertTime12to24(item).split(":")[0]) > currentTime && 
                      month == currentDate.getMonth()) || month > currentDate.getMonth()
                    }
                    onClick={() => { setSelectedTime(item) }}
                    time={item}
                    isSelected={selectedTime == item && month <= currentDate.getMonth()}
                  />
                </div>
              )
            })}
          </div>
          <div className="d-flex py-1 small-text normal-black mb-3 justify-content-between align-items-center hide-scroll overflow-auto">
            <span>Second Batch</span>
            <div className="d-flex ">
              <SUMMARY
                open={summaryEveningModel}
                openModal={onEveningModalOpen}
                closeModal={() => { setEveningModel(false) }}
                onSave={(data: any) => { proccessSummaryData(data, "evening") }}
                data={ESData}
                disabled={selectedDate.split(" ")[2] !== currentDate.toString().split(" ")[2]}
              />
            </div>
          </div>
          <div className="row mt-3">
            {eveningBatch.map((item: any, index: any) => {
              return (
                <div key={`select-slot-evening ${index}`} className="col-md-3 ">
                  <DaysWiseTime
                    onClick={() => { setSelectedTime(item) }}
                    disabled={
                      (selectedDate.split(" ")[2] == String(currentDate).split(" ")[2] &&
                      parseInt(convertTime12to24(item).split(":")[0]) > currentTime && 
                      month == currentDate.getMonth()) || month > currentDate.getMonth()
                    }
                    time={item}
                    isSelected={selectedTime == item && month <= currentDate.getMonth()}
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
  AddPatientDetailsByTime,
  setPatientIntubedData
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientReportDetails);
