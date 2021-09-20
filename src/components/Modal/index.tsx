import React from 'react'
import { Button, Modal } from "react-bootstrap"
import { AddIcon } from 'components/Icons'
import Swal from 'sweetalert2'

interface ModalProps {
  setDiagonasticList: any;
  clearDiagonasticList: any;
  diagnosisList: any;
}

interface ModalState {
  show: boolean;
  diagnostic: string;
}

class Index extends React.Component<ModalProps, ModalState> {
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
    this.props.clearDiagonasticList("diagnosisList");
    this.setState({
      show: false,
      diagnostic: "",
    });
  }

  addDiagnosticLists = (e: any) => {
    e.preventDefault();
    if (!this.state.diagnostic) {
      Swal.fire({
        title: 'error',
        icon: 'error',
        showCloseButton: true,
        cancelButtonText: 'Ok',
        html: `<p>Diagnostic test field is required</p>`,
      })
    }
    else {
      this.props.setDiagonasticList("diagnosisList", this.state.diagnostic);
      this.setState({
        diagnostic: ""
      })
    }
  }

  saveDiagonosticModal = () => {
    if (this.props.diagnosisList.length < 1) {
      Swal.fire({
        title: 'error',
        icon: 'error',
        showCloseButton: true,
        cancelButtonText: 'Ok',
        html: `<p>Add atleast one test to proceed</p>`,
      })
    }
    else {
      this.setState({
        show: false,
        diagnostic: "",
      });
    }
  }

  render() {
    return (
      <div>
        <button
          style={{ backgroundColor: "transparent", border: "none" }}
          type="button"
          onClick={this.openDiagonosticModal}
        >
          <AddIcon />
        </button>
        <Modal className="mt-5" show={this.state.show} onHide={this.closeDiagonosticModal}>
          <Modal.Header closeButton >
            <h3>Diagnostic List</h3>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="col-md-12">
                <div className="card-body">
                  <form className="add-items d-flex">
                    <input
                      type="text"
                      value={this.state.diagnostic}
                      className="form-control todo-list-input"
                      placeholder="Enter Diagnostic Tests"
                      onChange={this.handleChange}
                    />
                    <button
                      onClick={this.addDiagnosticLists}
                      className="add btn btn-primary font-weight-bold todo-list-add-btn ml-3"
                      style={{ backgroundColor: "#1e30a0", borderColor: "#1e30a0" }}
                    >
                      Add
                    </button>
                  </form>
                  <div className="list-wrapper mt-3">
                    <ul className="d-flex flex-column">
                      {this.props.diagnosisList.map((item: any, index: any) => (
                        <li key={`dignosis-${index}`}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button style={{ backgroundColor: "#1e30a0", borderColor: "#1e30a0" }} onClick={this.closeDiagonosticModal}>
              Close
            </Button>
            <Button style={{ backgroundColor: "#1e30a0", borderColor: "#1e30a0" }} onClick={this.saveDiagonosticModal}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Index
