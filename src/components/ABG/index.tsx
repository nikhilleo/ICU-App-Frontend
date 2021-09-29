import React from 'react'
import ReportInput from 'components/ReportInput'
function index() {
  return (
    <div>
       <ReportInput type="number"  head="Potential Hydrogen" innervalues={[{ name: "PH", colSize: "12", "data-redux-key": "ph" }]} />
      <ReportInput type="number"  head="Partial Pressure Of Carbon Dioxide" innervalues={[{ name: "PCO2", colSize: "12", "data-redux-key": "pco2" }]} />
      <ReportInput type="number"  head="Partial Pressure Of Oxygen" innervalues={[{ name: "PO2", colSize: "12", "data-redux-key": "po2" }]} />
      <ReportInput type="number"  head="Bicarbonate " innervalues={[{ name: "HCO3", colSize: "12", "data-redux-key": "hco3" }]} />
      <ReportInput type="number"  head="Oxygen Saturation " innervalues={[{ name: "SAT", colSize: "12", "data-redux-key": "sat" }]} />

    </div>
  )
}

export default index
