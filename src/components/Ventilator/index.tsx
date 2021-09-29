import React from 'react'
import ReportInput from 'components/ReportInput'
import ReportSelect from 'components/ReportSelect'
import styles from "../ReportInput/index.module.scss";
import { ErrorWrap } from 'components/Input';

function Ventilator() {
  return (
    <div>
      <ReportInput type="number" head="Percent Saturation Of Oxygen In The Blood" innervalues={[{ name: "SPO2", colSize: "12", "data-redux-key": "spo2" }]} />
      <ReportInput type="number" head="Respiratory  Rate" innervalues={[{ name: "RR", colSize: "12", "data-redux-key": "rr" }]} />
      <ReportSelect head="MODE" innervalues={[{ Modename: "CMV", colSize: "3", "data-redux-key": "CMV" }, { Modename: "SIMV", colSize: "3", "data-redux-key": "SIMV" }, { Modename: "PC", colSize: "3", "data-redux-key": "PC" }, { Modename: "PS", colSize: "3", "data-redux-key": "PS" }, { Modename: "BIPAP", colSize: "3", "data-redux-key": "BIPAP" }, { Modename: "HFNO", colSize: "3", "data-redux-key": "HFNO" }]} />
      <ReportInput type="number" head="Temperature" innervalues={[{ name: "SKIN *F", colSize: "6", "data-redux-key": "skin" }, { name: "CORE", colSize: "6", "data-redux-key": "core" }]} />
      <ReportInput type="number" head="RATE" innervalues={[{ name: "IMV/SET", colSize: "6", "data-redux-key": "imv_set" }, { name: "SIMV", colSize: "6", "data-redux-key": "simv" }, { name: "OBSERVED", colSize: "12", "data-redux-key": "observed" }]} />
      <ReportInput type="number" head="Minute Ventilation" innervalues={[{ name: "SET", colSize: "6", "data-redux-key": "set_mv" }, { name: "EXP MV", colSize: "6", "data-redux-key": "exp_mv" }]} />
      <ReportInput type="number" head="Transvaginal ultrasound" innervalues={[{ name: "INSP ", colSize: "6", "data-redux-key": "insp" }, { name: "EXP", colSize: "6", "data-redux-key": "exp_tv" }]} />
      <ReportInput type="number" head="Fraction of Inspired Oxygen" innervalues={[{ name: "FIO2", colSize: "12", "data-redux-key": "fio2" }]} />
      <ReportInput type="number" head="Infective endocarditis" innervalues={[{ name: "I:E", colSize: "12", "data-redux-key": "i_e" }]} />
      <ReportInput type="number" head="PEEP/CPAP" innervalues={[{ name: "PEEP/CPAP", colSize: "12", "data-redux-key": "peep_cpap" }]} />
      <ReportInput type="number" head="PRESS SUPPORT" innervalues={[{ name: "PRESS SUPPORT", colSize: "12", "data-redux-key": "press_support" }]} />
      <ReportInput type="number" head="INP PRESS PEAK" innervalues={[{ name: "INP PRESS PEAK", colSize: "12", "data-redux-key": "inp_press_peak" }]} />
      <ReportInput type="number" head="INP PRESS PLAT " innervalues={[{ name: "INP PRESS PLAT", colSize: "12", "data-redux-key": "inp_press_plat" }]} />
      <ReportInput type="number" head="TRIGGER SENS " innervalues={[{ name: "INP PRESS PEAK", colSize: "12", "data-redux-key": "trigger_sens" }]} />
    </div>
  )
}

export default Ventilator
