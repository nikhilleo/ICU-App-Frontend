import Typography from 'components/Typography'
import React, { useState } from 'react'
import DashboardWrapper from 'components/DashboardWrapper'
import Swal from 'sweetalert2'

function PatientReportDetails({ router }: any) {
  const [data, setData]: any = useState();

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
      <div className="default-container">
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
        {/* Add Swapnil code */}
        
      </div>
    </Typography>
  )
}

export default PatientReportDetails
