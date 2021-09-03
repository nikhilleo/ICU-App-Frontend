import { Component } from "react";
import { CloseIcon, PhoneIcon } from "components/Icons";
import { UserIcon } from "components/Icons";
import Input, { ErrorWrap } from "components/Input";
import { AgeIcon } from "components/Icons"
import { GendersIcon } from "components/Icons"
import {ImgUploadIcon} from "components/Icons"
import FormWrapper from "components/FormWrapper";
import { connect } from "react-redux";
import Modal from 'components/Modal'
import styles from './index.module.scss'
import {DiagnosticIcon} from "components/Icons"
import { setPatientData, clearDiagonasticList, setPatientFormError, validatePatientData, PatientAddProcess, setPatientDataHelper, setDiagonasticList} from "redux/patient";
 
interface LoginProps {
  router: any;
  setPreLoader: any;
  data: any;
  setPatientData: any;
  setPatientDataHelper: any;
  clearDiagonasticList: any;
  setDiagonasticList: any;
  setPatientFormError: any;
  validatePatientData: any;
  PatientAddProcess: any;
  error: object;
}

interface LoginState {
  data: object;
  imagePreviewUrl: string;
}

class Register extends Component<LoginProps, LoginState> {
  state = {
    data: { },
    imagePreviewUrl: "",
  }

  onSubmit = async (e: any) => {
    e.preventDefault();
    if (!this.props.validatePatientData()) return;
    this.props.setPatientFormError("", "")
    this.props.PatientAddProcess("/patient/addPatient",this.props.setPreLoader, () => {
      // this.props.router.replace("/Patient")
    });
  }

  onImageChange = (e: any) => {
    const reader = new FileReader();
    reader?.addEventListener("load", (event: any) => {
      this.setState({
        imagePreviewUrl: event.target.result
      })
    });
    reader?.readAsDataURL(e?.target?.files?.[0]);
    this.props.setPatientDataHelper("patient_image", e.target.files[0])
  }

  removeImage = () => {
    this.setState({
      imagePreviewUrl: ""
    })
    this.props.setPatientDataHelper("patient_image", "")
  }

  render() {
    const { 
      fName,
      lName,
      mobile,
      age,
      gender,
      patient_image,
      diagnosisList
     } = this.props.data;
     console.log(this.props.data)
    return (
      <FormWrapper onSubmit={this.onSubmit} method="Add Patient" >
        <div className="w-100 mb-4 pb-2">
          <Input
            Icon={UserIcon}
            inputProps={{
              placeholder: "First Name",
              type: "text",
              "data-state-key": "fName"
            }}
            value={fName}
            onChange={this.props.setPatientData}
            error={this.props.error}
            id="add-patient-firstname"
          />
        </div>
        <div className="w-100 mb-4 pb-2">
          <Input
            Icon={UserIcon}
            inputProps={{
              placeholder: "Last Name",
              type: "text",
              "data-state-key": "lName"
            }}
            value={lName}
            onChange={this.props.setPatientData}
            error={this.props.error}
            id="add-patient-lastname"
          />
        </div>
        <div className="w-100 mb-4 pb-2">
          <Input
            Icon={PhoneIcon}
            inputProps={{
              placeholder: "Mobile",
              type: "tel",
              "data-state-key": "mobile"
            }}
            value={mobile}
            onChange={this.props.setPatientData}
            error={this.props.error}
            id="add-patient-mobile"
          />
        </div>
        <div className="w-100 mb-4 pb-2">
          <Input
            Icon={AgeIcon}
            inputProps={{
              placeholder: "Age",
              type: "number",
              "data-state-key": "age"
            }}
            value={age}
            onChange={this.props.setPatientData}
            error={this.props.error}
            id="add-patient-age"
          />
        </div>
        <div className="w-100 mb-4 pb-2">
          <ErrorWrap id="add-patient-gender" error={this.props.error}>
            <div className={styles.inputContainer} >
              <span className={styles.inputIcon}><GendersIcon /></span>
              <select
                data-state-key="gender"
                onChange={this.props.setPatientData}
                className={styles.SelectContainer}
                value={gender}
              >
                <option value="">Gender</option>
                <option value="Male" >Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </ErrorWrap>
        </div>
        <div className="w-100 mb-4 pb-2">
          <div className={styles.inputContainer} >
            <span className={styles.inputIcon}><ImgUploadIcon /></span>
            <label className={styles.ImgContainer} >
              Profile Photo Upload
              <input
                type="file"
                name="image"
                style={{ width: '75%', height: '0px', }}
                onChange={this.onImageChange}
              />
            </label>
          </div>
        </div>
        {this.state.imagePreviewUrl ? (
          <div className="w-100 mb-4 pb-2 d-flex justify-content-center">
            <img style={{ maxWidth: "40%" }} src={this.state.imagePreviewUrl} alt="" />
            <div style={{ cursor: "pointer" }} onClick={this.removeImage}>
              <CloseIcon />
            </div>
          </div>
        ) : null}
        <div className="w-100 mb-4 pb-2">
          <ErrorWrap id="add-patient-dignosis-list" error={this.props.error}>
            <div className={styles.inputContainer} >
              <span className={styles.inputIcon}><DiagnosticIcon /></span>
              <div className={styles.ListContainer} >
                <div>Diagnostic List</div>
              </div>
              <Modal
                clearDiagonasticList={this.props.clearDiagonasticList}
                setDiagonasticList={this.props.setDiagonasticList}
                diagnosisList={diagnosisList}
              />
            </div>
          </ErrorWrap>
        </div>
      </FormWrapper>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    data: state.patient.patientData,
    error: state.patient.error
  }
}

const mapDispatchToProps = {
  setPatientData,
  setPatientFormError,
  validatePatientData,
  PatientAddProcess,
  setPatientDataHelper,
  setDiagonasticList,
  clearDiagonasticList,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);