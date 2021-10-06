import React from 'react'
import ReportInput from 'components/ReportInput'

function Intake() {
  return (
    <div>
      <ReportInput type="number" head="IV FLUID" innervalues={[{ name: "IV FLUID", colSize: "12", "data-redux-key": "IV_fluids" }]} />
      <ReportInput type="number" head="RT" innervalues={[{ name: "RT", colSize: "12", "data-redux-key": "rt" }]} />
      <ReportInput type="text" head="DRUGS/BLOUSES" innervalues={[{ name: "DRUGS/BLOUSES", colSize: "12", "data-redux-key": "drug_blouses" }]} />
      <ReportInput type="number" head="INFUSION" innervalues={[{ name: "INFUSION", colSize: "12", "data-redux-key": "infusion" }]} />
      <ReportInput type="Number" head="MISCELLANEOUS" innervalues={[{ name: "MISCELLANEOUS", colSize: "12", "data-redux-key": "miscellaneous" }]} />
    </div>
  )
}

export default Intake
