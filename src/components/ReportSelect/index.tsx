import styles from "./index.module.scss";
import { ErrorWrap } from "components/Input";
import { connect } from "react-redux";
import { setPatientReportDetails } from "redux/patient"

function ReportSelectInput({ head, innervalues, error, setPatientReportDetails, data, disabled }: any) {
  return (
    <div className={`${styles.Maincontainer} container py-2 `}>
      <ErrorWrap id="mode" error={error}>
        <div data-redux-key="mode"> <label><span className="hidden-xs ">
          <h6 className={`${styles.Name}`} >{head}</h6>
        </span></label>
        </div>
      </ErrorWrap>
        <div className="row ">
          {innervalues.map((item: { Modename: string, colSize: number, "data-redux-key": string }, index: any) => {
            return (
              <div key={`report-select ${index}`} className={`col-md-${item.colSize} mt-4 `}>
                <label className={`${styles.Modeame} container `}>{item.Modename}
                  <input
                    value={item["data-redux-key"]}
                    name={head}
                    type="radio"
                    className={styles.checkbox}
                    id="mode"
                    data-redux-key="mode"
                    checked={item["data-redux-key"] == data?.mode}
                    onChange={setPatientReportDetails}
                    disabled={disabled}
                  />
                  <span className="checkmark " />
                </label>
              </div>
            )
          })}
        </div>
    </div>
  )
}

const mapStateToProps = (state: any, ownProps: any) => {
  const { patientReportDetails, prdErrors } = state.patient;
  return {
    data: patientReportDetails,
    error: prdErrors,
    disabled: patientReportDetails.disabled
  }
}

const mapDispatchToProps = {
  setPatientReportDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportSelectInput);
