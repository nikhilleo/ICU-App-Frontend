import React from 'react'
import ReportInput from 'components/ReportInput'
function index() {
  return (
    <div>
      <ReportInput type="number" head="IV FLUID" innervalues={[{ name: "IV FLUID", colSize: "12" }]} />
      <ReportInput type="number" head="RT" innervalues={[{ name: "RT", colSize: "12" }]} />
      <ReportInput type="text" head="DRUGS/BLOUSES" innervalues={[{ name: "DRUGS/BLOUSES", colSize: "12" }]} />
      <ReportInput type="number" head="INFUSION" innervalues={[{ name: "INFUSION", colSize: "12" }]} />
      <ReportInput type="Number" head="MISCELLANEOUS" innervalues={[{ name: "MISCELLANEOUS", colSize: "12" }]} />
      <ReportInput type="number" head="Total" innervalues={[{ name: "Total", colSize: "12" }]} />
    </div>
  )
}

export default index
