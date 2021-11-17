import HUMANBODY from 'components/HUMANBODY'
import DashboardWrapper from 'components/DashboardWrapper';
import { useEffect, useState } from 'react';
import { getLocalStorageItem } from 'utils/helper';
import axios from '../../../axios'
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import Button from 'components/Button';
import { submitIntubedData } from 'redux/patient';

function PatientReportDetails({ isLoggedIn, router, setPreLoader, intubed_data }: any) {
  const [data, setData]: any = useState();
  const [intubedData, setIntubedData]: any = useState([]);
  const id = getLocalStorageItem("patient-id");
  const currentDate = new Date()

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

  useEffect(() => {
    if(data?.intube_id?.tubes?.length) setIntubedData(data?.intube_id?.tubes)
  },[data])

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

  const processIntubedData = () => {
    if (intubedData.length < 1) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        showCloseButton: true,
        cancelButtonText: 'Ok',
        html: `<p>Select atleast 1 Tube</p>`,
      })
      return
    }
    submitIntubedData(id, currentDate, router.query.formattedTime, intubedData, setPreLoader, (res) => {
      if (res.success) {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          showCloseButton: true,
          cancelButtonText: 'Ok',
          html: `<p>Data Saved Successfully</p>`,
        })
        router.back();
      }
    });
  }

  return (
    <div className="default-container">
      <DashboardWrapper goBack={goBack} logout={logout}>
        <div className="w-100 justify-content-center row no-gutters align-items-center mt-4">
          <div style={{ maxWidth: "110px" }}>
            <img className="card-img " src={data?.patinet_image ? data.patinet_image : "/Images/doctor.png"} alt="Patient Image" />
          </div>
          <div className="small-text-sm mt-3 ml-5 overflow-hidden">
            <p className="ml-4 d-flex lh-20">Patient Name :- {`${data?.fName || ""} ${data?.lName || ""}`}</p>
            <p className="ml-4 d-flex lh-20">Age :- {data?.age || ""}</p>
            <p className="ml-4 d-flex lh-20">Sex :- {data?.gender || ""}</p>
          </div>
        </div>
      </DashboardWrapper>
      <HUMANBODY
        data={intubedData}
        setData={setIntubedData}
      />
      <Button
        onClick={processIntubedData}
        buttonStyle={{ width: "80%" }}
      >
        <h4>Submit</h4>
      </Button>
    </div>
  )
}

const mapStateToProps = (state: any, ownProps: any) => {
  const currentUserDetails = JSON.parse(getLocalStorageItem('user-details') || "{}");
  const isLoggedIn = Boolean(currentUserDetails && currentUserDetails.mobile)
  return {
    isLoggedIn,
    intubed_data: state.patient?.intubedData ? state.patient.intubedData : []
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientReportDetails);
