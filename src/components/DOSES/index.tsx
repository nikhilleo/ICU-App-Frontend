import { Component } from "react";
import { connect } from "react-redux";
import DOSESMODAL from 'components/DOSESMODAL'
import styles from './index.module.scss'
import { DeleteIcon } from 'components/Icons'
import {

  clearDiagonasticList,

  setPatientDataHelper,
  setDiagonasticList
} from "redux/patient";

class Register extends Component<LoginProps, LoginState> {
  state = {
    data: {},
    imagePreviewUrl: "",
  }
  render() {
    const {
      diagnosisList
    } = this.props.data;
    return (
      <div className="overflow-hidden">


        <DOSESMODAL
          clearDiagonasticList={this.props.clearDiagonasticList}
          setDiagonasticList={this.props.setDiagonasticList}
          diagnosisList={diagnosisList}
        />



        <div className={`${styles.inputContainer} `}  >
          <div className={`${styles.Container} hide-scroll`}>
            <div className={styles.main}>
              <table className={`${styles.table} table mt-2`}  >
                <thead className={styles.thead} >
                  <tr>
                    <th scope="col" ><span className={styles.Idtag}>ID</span></th>
                    <th scope="col" className={styles.name}>NAME OF ONCE DRUG</th>
                    <th scope="col" className={styles.name}>NAME OF DOCTOR</th>
                    <th scope="col" className={styles.name1}>DOSE</th>
                    <th scope="col" className={styles.name1}>ROUTE</th>
                    <th scope="col" className={styles.name1}>ACTIONS</th>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" ><h6 className={styles.Id}>1</h6></th>
                    <td ><h6 className={styles.td}>Larry</h6></td>
                    <td ><h6 className={styles.td}>Larry</h6></td>
                    <td ><h6 className={styles.td}>Larry</h6></td>
                    <td ><h6 className={styles.td}>Larry</h6></td>
                    <td ><h6 className={styles.td}><DeleteIcon /></h6></td>
                  </tr>
                  <tr>
                    <th scope="row" ><h6 className={styles.Id}>2</h6></th>
                    <td ><h6 className={styles.td}>Larry</h6></td>
                    <td ><h6 className={styles.td}>Larry</h6></td>
                    <td ><h6 className={styles.td}>Larry</h6></td>
                    <td ><h6 className={styles.td}>Larry</h6></td>
                    <td ><h6 className={styles.td}><DeleteIcon /></h6></td>
                  </tr>
                  <tr>
                    <th scope="row " ><h6 className={styles.Id}>3</h6></th>
                    <td ><h6 className={styles.td}>Larry</h6></td>
                    <td ><h6 className={styles.td}>Larry</h6></td>
                    <td ><h6 className={styles.td}>Larry</h6></td>
                    <td ><h6 className={styles.td}>Larry</h6></td>
                    <td ><h6 className={styles.td}><DeleteIcon /></h6></td>
                    
                  </tr>
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
  return {
    data: state.patient.patientAddData,
    error: state.patient.error
  }
}

const mapDispatchToProps = {

  setPatientDataHelper,
  setDiagonasticList,
  clearDiagonasticList,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);