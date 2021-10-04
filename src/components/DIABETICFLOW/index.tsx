import React from 'react'
import ReportInput from 'components/ReportInput'
function index() {
  return (
    <div>
      <ReportInput type="number" head="INSULIN" innervalues={[{ name: "INSULIN", colSize: "12", "data-redux-key": "insuline" }]} />
      <ReportInput type="number" head="VALUE" innervalues={[{ name: "VALUE", colSize: "12", "data-redux-key": "value" }]} />
    </div>
  )
}

export default index
