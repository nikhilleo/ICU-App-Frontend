import React, { ChangeEventHandler } from 'react'
import { Button, Modal } from "react-bootstrap"
import { AddColorIcon } from 'components/Icons'
import styles from './index.module.scss';
import { ErrorWrap } from 'components/Input';

interface ModalProps {
  addDosesData: any;
}

interface ModalState {
  show: boolean;
  data: object;
  error: object
}

class Index extends React.Component<ModalProps, ModalState> {
  state = {
    show: false,
    data: {
      name_of_drug: "",
      dose: "",
      route: "",
      name_of_doctor: ""
    },
    error: {}
  }

  openDiagonosticModal = () => {
    this.setState({
      show: true
    })
  }

  closeDiagonosticModal = () => {
    this.setState({
      show: false,
    });
  }

  setError = (key: string, value: string) => {
    this.setState({
      error: {
        [key]: value
      }
    })
  }

  validateDosesData = () => {
    const {
      name_of_drug,
      dose,
      route,
      name_of_doctor
    } = this.state.data;
    if (!name_of_drug) {
      this.setError("name_of_drug", "This is a required * field")
      return false
    }
    if (!dose) {
      this.setError("dose", "This is a required * field")
      return false
    }
    if (!route) {
      this.setError("route", "This is a required * field")
      return false
    }
    if (!name_of_doctor) {
      this.setError("name_of_doctor", "This is a required * field")
      return false
    }
    return true;
  }

  saveDiagonosticModal = () => {
    if (!this.validateDosesData()) return
    this.props.addDosesData(this.state.data);
    this.setState({
      show: false,
      data: {
        name_of_drug: "",
        dose: "",
        route: "",
        name_of_doctor: ""
      },
      error: {}
    })
  }

  onChange = (e: any) => {
    let key = e.target.attributes.getNamedItem("data-redux-key").value;
    let value = e.target.value;
    this.setState(prevProps => ({
      data: {
        ...prevProps.data,
        [key]: value
      }
    }))
  }

  render() {
    const { error } = this.state;
    const {
      name_of_drug,
      dose,
      route,
      name_of_doctor
    } = this.state.data;

    return (
      <div>
        <div className={styles.inputContainer}>
          <button
            style={{ backgroundColor: "transparent", border: "none" }}
            type="button"
            onClick={this.openDiagonosticModal}
          >
            <AddColorIcon />
          </button>
        </div>
        <Modal className="mt-5" show={this.state.show} onHide={this.closeDiagonosticModal}>
          <Modal.Body >
            <div >
              <div className="container contact-form">
                <div className="row d-flex justify-content-center">
                  <div className="col-md-8">
                    <div className="form-group">
                      <h6 className="ml-3">NAME OF DRUG</h6>
                      <ErrorWrap id="name_of_drug" error={error}>
                        <input
                          className={`${styles.input} form-control`}
                          type="text"
                          name="txtName"
                          placeholder="NAME OF DRUG *"
                          onChange={this.onChange}
                          data-redux-key="name_of_drug"
                          value={name_of_drug}
                        />
                      </ErrorWrap>
                    </div>
                    <div className="form-group">
                      <h6 className="ml-3">DOSE</h6>
                      <ErrorWrap id="dose" error={error}>
                        <input
                          className={`${styles.input} form-control`}
                          type="text"
                          name="txtEmail"
                          placeholder="DOSE *"
                          onChange={this.onChange}
                          data-redux-key="dose"
                          value={dose}
                        />
                      </ErrorWrap>
                    </div>
                    <div className="form-group">
                      <h6 className="ml-3">ROUTE</h6>
                      <ErrorWrap id="route" error={error}>
                        <input
                          className={`${styles.input} form-control`}
                          type="text"
                          name="txtPhone"
                          placeholder="ROUTE *"
                          onChange={this.onChange}
                          data-redux-key="route"
                          value={route}
                        />
                      </ErrorWrap>
                    </div>
                    <div className="form-group">
                      <h6 className="ml-3">DOCTOR NAME</h6>
                      <ErrorWrap id="name_of_doctor" error={error}>
                        <input
                          className={`${styles.input} form-control`}
                          type="text"
                          name="txtPhone"
                          placeholder="DOCTOR NAME *"
                          onChange={this.onChange}
                          data-redux-key="name_of_doctor"
                          value={name_of_doctor}
                        />
                      </ErrorWrap>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className={styles.modal} >
            <Button className={styles.button} onClick={this.saveDiagonosticModal}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Index
