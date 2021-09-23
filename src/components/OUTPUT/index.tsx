import React from 'react'
import ReportInput from 'components/ReportInput'
function index() {
  return (
    <div>
      <ReportInput type="number" head="NG / RT" innervalues={[{ name: "NG/RT", colSize: "12" }]} />
      <ReportInput type="number" head="UOP" innervalues={[{ name: "UOP", colSize: "12" }]} />
      <ReportInput type="Number" head="DRAIN" innervalues={[{ name: "DRAIN", colSize: "12" }]} />
      <ReportInput type="number" head="Total" innervalues={[{ name: "Total", colSize: "12" }]} />
    </div>
  )
}

export default index
