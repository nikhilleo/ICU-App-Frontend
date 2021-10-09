import { ErrorWrap } from 'components/Input'
import React from 'react'
import { Button, Modal } from "react-bootstrap"
import styles from './index.module.scss'

class Index extends React.Component<any, any> {
  state = {
    summaryDetails: {
      doctor_name: "",
      summary: "",
    },
    error: {}
  }

  componentDidMount() {
    const { data } = this.props;
    if(data) {
      this.setState({
        summaryDetails: {
          doctor_name: data.doctor_name,
          summary: data.summary
        }
      })
    }
  }

  componentDidUpdate(prevProps: any) {
    const { data } = this.props;
    if(prevProps.data !== data) {
    this.setState({
        summaryDetails: {
          doctor_name: data.doctor_name,
          summary: data.summary
        }
      })
    }
  } 

  handleChange = (e: any) => {
    let key = e.target.attributes.getNamedItem("data-state-key").value;
    let value = e.target.value;
    this.setState((prevState: any) => ({
      summaryDetails: {
        ...prevState.summaryDetails,
        [key]: value
      }
    }))
  }

  setError = (key: string, value: string) => {
    this.setState({
      error: {
        [key]: value
      }
    })
  }

  validateSummaryDetails = () => {
    const {
      doctor_name,
      summary
    } = this.state.summaryDetails
    if (!doctor_name) {
      this.setError("doctor_name", "This is a required * field")
      return false
    }
    if (!summary) {
      this.setError("summary", "This is a required * field")
      return false
    }
    return true
  }

  saveDiagonosticModal = () => {
    if (this.validateSummaryDetails()) {
      this.props.onSave(this.state.summaryDetails)
    }
  }

  onClose = () => {
    this.setState({
      summaryDetails: {
        doctor_name: "",
        summary: "",
      },
      error: {}
    })
    this.props.closeModal()
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <div className={styles.inputContainer1}>
          <button
            className={styles.inputContainer}
            type="button"
            onClick={this.props.openModal}
          >
            <h4 className={styles.name}>Summary</h4>
          </button>
        </div>
        <Modal className="mt-5" show={this.props.open} onHide={this.onClose}>
          <Modal.Body>
            <div >
              <div className="container contact-form">
                <div className="row d-flex justify-content-center">
                  <div className="col-md-12">
                    <div className="form-group">
                      <h6 className="ml-3">NAME OF DOCTOR</h6>
                      <ErrorWrap id="doctor_name" error={this.state.error}>
                        <input
                          className={`${styles.input} form-control`}
                          type="text"
                          name="txtName"
                          placeholder="NAME OF DOCTOR *"
                          data-state-key="doctor_name"
                          onChange={this.handleChange}
                          value={this.state.summaryDetails.doctor_name}
                        />
                      </ErrorWrap>
                    </div>
                    <div className="form-group">
                      <div>
                        <h6 className="ml-3">Summary:</h6>
                        <ErrorWrap id="summary" error={this.state.error}>
                          <textarea
                            className={styles.textarea}
                            id="story"
                            name="story"
                            rows={5}
                            cols={33}
                            data-state-key="summary"
                            onChange={this.handleChange}
                            value={this.state.summaryDetails.summary}
                          />
                        </ErrorWrap>
                      </div>
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
