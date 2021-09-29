import React from 'react'
import ReportInput from 'components/ReportInput'

function Vitals() {
  return (
    <div>
      <ReportInput
        type="number"
        head="Heart Rate"
        innervalues={[{ name: "HR", colSize: "12", "data-redux-key": "heart_rate" }]} />
      <ReportInput
        type="number"
        head="Blood Pressure"
        innervalues={[
          { name: "SBP", colSize: "6", "data-redux-key": "sbp" },
          { name: "DBP", colSize: "6", "data-redux-key": "dbp" },
          { name: "MBP", colSize: "12", "data-redux-key": "mbp" }
        ]}
      />
      <ReportInput
        type="number"
        head="Central Venous Pressure"
        innervalues={[{ name: "cvp", colSize: "12", "data-redux-key": "cvp" }]} />
    </div>
  )
}

export default Vitals
