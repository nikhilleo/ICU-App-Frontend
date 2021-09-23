import React from 'react'
import ReportInput from 'components/ReportInput'
import ReportSelect from 'components/ReportSelect'

function index() {
  return (
      <div>   
      <ReportInput  type="number"  head="Percent Saturation Of Oxygen In The Blood" innervalues={[{ name: "SPO2", colSize: "12" }]} />
      <ReportInput  type="number" head="Respiratory  Rate" innervalues={[{ name: "RR", colSize: "12" }]} />
      <ReportSelect   head="MODE" innervalues={[{ Modename: "CMV", colSize: "3" }, { Modename: "SIMV", colSize: "3" }, { Modename: "PC", colSize: "3" }, { Modename: "PS", colSize: "3" }, { Modename: "BIPAP", colSize: "3" }, { Modename: "HFNO", colSize: "3" }]} />
      <ReportInput  type="number" head="Temperature" innervalues={[{ name: "SKIN *F", colSize: "6" }, { name: "CORE", colSize: "6" }]} />
      <ReportInput type="number"  head="RATE" innervalues={[{ name: "IMV/SET", colSize: "6" },{ name: "SIMV", colSize: "6" },{ name: "OBSERVED", colSize: "12" }]} />
      <ReportInput  type="number" head="Minute Ventilation" innervalues={[{ name: "SET", colSize: "6" }, { name: "EXP MV", colSize: "6" }]} />
      <ReportInput type="number"  head="Transvaginal ultrasound" innervalues={[{ name: "INSP ", colSize: "6" }, { name: "EXP", colSize: "6" }]} />
      <ReportInput type="number"  head="Fraction of Inspired Oxygen" innervalues={[{ name: "FIO2", colSize: "12" }]} />
      <ReportInput type="number"  head="Infective endocarditis" innervalues={[{ name: "I:E", colSize: "12" }]} />
      <ReportInput type="number"  head="PEEP/CPAP" innervalues={[{ name: "PEEP/CPAP", colSize: "12" }]} />
      <ReportInput type="number"  head="PRESS SUPPORT" innervalues={[{ name: "PRESS SUPPORT", colSize: "12" }]} />
      <ReportInput type="number"  head="INP PRESS PEAK" innervalues={[{ name: "INP PRESS PEAK", colSize: "12" }]} />
      <ReportInput type="number"  head="INP PRESS PLAT " innervalues={[{ name: "INP PRESS PEAK", colSize: "12" }]} />
      <ReportInput type="number"  head="TRIGGER SENS " innervalues={[{ name: "INP PRESS PEAK", colSize: "12" }]} />
        </div>
  )
}

export default index
