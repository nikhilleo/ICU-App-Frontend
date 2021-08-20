import Typography from 'components/Typography'
import React from 'react'
import PatientDashboard from 'components/PatientDashboard'
import AddPatientButton from 'components/Button/AddPatientButton'
import PatientDashboardTable from 'components/PatientDashboardTable'
import Pagination from 'components/Pagination'
function index() {
  return (
    <Typography>
      <div className={`default-container `}>
        <div className=" align-self-start w-100">
          <PatientDashboard />
        </div >
        <div className=" align-self-end w-100">
          <AddPatientButton />
        </div>
        <div className="mt-4 align-self-start w-100 overflow-hidden ">
          <PatientDashboardTable />
        </div>
        <div className="postion" style={{marginLeft:"-20px"}}>
          <Pagination />
        </div>

      </div>
    </Typography>
  )
}

export default index

