import React from 'react'
import { Button, Modal } from "react-bootstrap"
import Swal from 'sweetalert2'
import styles from './index.module.scss'

class Index extends React.Component<any, any> {
  state = {
    show: false,
    diagnostic: "",
  }
  handleChange = (e: any) => {
    this.setState({
      diagnostic: e.target.value
    })
  }
  openDiagonosticModal = () => {
    this.setState({
      show: true
    })
  }
  closeDiagonosticModal = () => {
    this.setState({
      show: false,
      diagnostic: "",
    });
  }
  saveDiagonosticModal = () => {
    
  }

  render() {
    return (
      <div>
        <div className={styles.inputContainer1}>
          <button
            className={styles.inputContainer}
            type="button"
            onClick={this.openDiagonosticModal}
          ><h4 className={styles.name}>Average</h4>
          </button>
        </div>
        <Modal className="mt-5" show={this.state.show} onHide={this.closeDiagonosticModal}>
          <Modal.Body>
            <div >
              <div className="container contact-form">
                <form method="post" >
                  <div className="row d-flex justify-content-center">
                    <div className="col-md-12">
                      <div className="form-group">
                        <h6 className="ml-3">NAME OF DOCTOR</h6>
                        <input className={`${styles.input} form-control`} type="text" name="txtName" placeholder="NAME OF DOCTOR *" />
                      </div>
                      
                      <div className="form-group">
                        <div>
                          <h6 className="ml-3">Summary:</h6>
                          <textarea className={styles.textarea} id="story" name="story" rows={5} cols={33} />
                        </div>
                      </div>

                    </div>
                  </div>
                </form>
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
