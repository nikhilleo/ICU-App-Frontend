import React from 'react'
import ReportInput from 'components/ReportInput'
function index() {
  return (
    <div>
       <ReportInput type="number"  head="Potential Hydrogen" innervalues={[{ name: "PH", colSize: "12" }]} />
      <ReportInput type="number"  head="Partial Pressure Of Carbon Dioxide" innervalues={[{ name: "PCO2", colSize: "12" }]} />
      <ReportInput type="number"  head="Partial Pressure Of Oxygen" innervalues={[{ name: "PO2", colSize: "12" }]} />
      <ReportInput type="number"  head="Bicarbonate " innervalues={[{ name: "HCO3", colSize: "12" }]} />
      <ReportInput type="number"  head="Oxygen Saturation " innervalues={[{ name: "SAT", colSize: "12" }]} />

    </div>
  )
}

export default index
