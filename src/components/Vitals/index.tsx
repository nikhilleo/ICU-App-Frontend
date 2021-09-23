import React from 'react'
import ReportInput from 'components/ReportInput'
function index() {
  return (
    <div>
       {/* Heart Rate */}

       <ReportInput type="number"  head="Heart Rate" innervalues={[{ name: "HR", colSize: "12" }]} />

{/* Blood Pressure */}

       <ReportInput type="number"  head="Blood Pressure" innervalues={[{name:"SBP",colSize:"6"},{name:"DBP",colSize:"6"},{name:"MBP", colSize:"12"}] } />

    </div>
  )
}

export default index
