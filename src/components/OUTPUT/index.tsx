import React from 'react'
import ReportInput from 'components/ReportInput'
function index() {
  return (
    <div>
      <ReportInput type="number" head="NG / RT" innervalues={[{ name: "NG/RT", colSize: "12", "data-redux-key": "ng_rt" }]} />
      <ReportInput type="number" head="UOP" innervalues={[{ name: "UOP", colSize: "12", "data-redux-key": "uop" }]} />
      <ReportInput type="Number" head="DRAIN" innervalues={[{ name: "DRAIN", colSize: "12", "data-redux-key": "drain" }]} />
      <ReportInput type="number" head="Total" innervalues={[{ name: "Total", colSize: "12", "data-redux-key": "total" }]} />
    </div>
  )
}

export default index
