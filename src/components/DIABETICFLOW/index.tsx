import React from 'react'
import ReportInput from 'components/ReportInput'
function index() {
  return (
    <div>
      <ReportInput type="number" head="INSULIN" innervalues={[{ name: "INSULIN", colSize: "12" }]} />
      <ReportInput type="number" head="VALUE" innervalues={[{ name: "VALUE", colSize: "12" }]} />
      
    </div>
  )
}

export default index
