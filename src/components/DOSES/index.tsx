import { Component } from "react";
import { connect } from "react-redux";
import DOSESMODAL from 'components/DOSESMODAL'
import styles from './index.module.scss'
import { DeleteIcon } from 'components/Icons'
import {
  setDoses,
  deleteADose
} from "redux/patient";

class Doses extends Component<any, any> {
  render() {
    return (
      <div className="overflow-hidden">
        {this.props.disabled ? null : (<DOSESMODAL addDosesData={this.props.setDoses} />)}
        <div className={`${styles.inputContainer} mt-4 `}  >
          <div className={`${styles.Container} hide-scroll `}>
            <div className={styles.main}>
              <table className={`${styles.table} table mt-2`}  >
                <thead className={styles.thead} >
                  <tr>
                    <th scope="col" ><span className={styles.Idtag}>ID</span></th>
                    <th scope="col" className={styles.name}>NAME OF  DRUG</th>
                    <th scope="col" className={styles.name}>NAME OF DOCTOR</th>
                    <th scope="col" className={styles.name1}>DOSE</th>
                    <th scope="col" className={styles.name1}>ROUTE</th>
                    <th scope="col" className={styles.name1}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.doses?.length > 0 ? (this.props.doses.map((item: any, index: number) => (
                    <tr key={`map-doses ${index}`}>
                      <th scope="row" ><h6 className={styles.Id}>{index + 1}</h6></th>
                      <td ><h6 className={styles.td}>{item.name_of_drug}</h6></td>
                      <td ><h6 className={styles.td}>{item.name_of_doctor}</h6></td>
                      <td ><h6 className={styles.td}>{item.dose}</h6></td>
                      <td ><h6 className={styles.td}>{item.route}</h6></td>
                      <td >
                        <h6
                          className={`${styles.td} ${this.props.disabled ? styles.disabledActionBtn : ""}`}
                          onClick={this.props.disabled ? () => { } : () => { this.props.deleteADose(index) }}
                        ><DeleteIcon />
                        </h6>
                      </td>
                    </tr>
                  ))) : (null)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  const { patientReportDetails } = state.patient;
  return {
    doses: state.patient.patientDosesData,
    error: state.patient.patientDosesError,
    disabled: patientReportDetails.disabled
  }
}

const mapDispatchToProps = {
  setDoses,
  deleteADose,
}

export default connect(mapStateToProps, mapDispatchToProps)(Doses);