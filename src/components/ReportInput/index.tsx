import styles from "./index.module.scss";
import { ErrorWrap } from "components/Input";
import { connect } from "react-redux";
import { setPatientReportDetails } from "redux/patient"

function ReportInput({ head, innervalues, type, error, setPatientReportDetails, data, disabled }: any) {
  return (
    <div className={`${styles.Maincontainer} container py-2 `}>
      <div> <label><span className="hidden-xs">
        <h6 className={styles.Name}>{head}</h6>
      </span></label>
      </div>
      <div className="row ">
        {innervalues.map((item: { name: string, colSize: number, "data-redux-key": string }, index: any) => (
          <div key={`report-input ${index}`} className={`col-md-${item.colSize} mt-4`}>
            <ErrorWrap id={item["data-redux-key"]} error={error}>
              <div className="input-group">
                <span className="input-group-append">
                  <div className={`${styles.input}  input-group-text`}>{item.name}</div>
                </span>
                <input
                  value={data[item["data-redux-key"]]}
                  className={`${styles.disabledInput} form-control py-2 border-right-0 border text-center`}
                  type={type}
                  id={`example-search-input ${item["data-redux-key"]}`}
                  data-redux-key={item["data-redux-key"]}
                  onChange={setPatientReportDetails}
                  disabled={disabled}
                />
              </div>
            </ErrorWrap>
          </div>
        ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(ReportInput);
