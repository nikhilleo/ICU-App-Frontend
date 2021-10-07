import React from 'react'
import { Button, Modal } from "react-bootstrap"
import styles from './index.module.scss'

class Index extends React.Component<any, any> {
  render() {
    return (
      <div>
        <div className={styles.inputContainer1}>
          <button
            className={styles.inputContainer}
            type="button"
            onClick={this.props.openModal}
          ><h4 className={styles.name}>Today's Average</h4>
          </button>
        </div>
        <Modal className="mt-5" show={this.props.open} onHide={this.props.closeModal}>
          <Modal.Body>
                  <div className={styles.main1}>
                    <table className={`${styles.table} table mt-2`}  >
                      <thead className={styles.thead} >
                        <tr>
                          <th scope="col" ><span className={styles.Idtag}>ID</span></th>
                          <th scope="col" className={styles.name}>Name</th>
                          <th scope="col" className={styles.name}>Average Value</th>
                        </tr>
                      </thead>
                      <tbody>
                          <tr key={`map-doses`}>
                            <th scope="row" ><h6 className={styles.Id}>1</h6></th>
                            <td ><h6 className={styles.td}>Average Input Total: </h6></td>
                            <td ><h6 className={styles.td}>{this.props.data?.avgInputTotal}</h6></td>
                          </tr>
                          <tr key={`map-doses`}>
                            <th scope="row" ><h6 className={styles.Id}>2</h6></th>
                            <td ><h6 className={styles.td}>Average Output Total: </h6></td>
                            <td ><h6 className={styles.td}>{this.props.data?.avgOutputTotal}</h6></td>
                          </tr>
                          <tr key={`map-doses`}>
                            <th scope="row" ><h6 className={styles.Id}>3</h6></th>
                            <td ><h6 className={styles.td}>Total Input: </h6></td>
                            <td ><h6 className={styles.td}>{this.props.data?.inputTotal}</h6></td>
                          </tr>
                          <tr key={`map-doses`}>
                            <th scope="row" ><h6 className={styles.Id}>4</h6></th>
                            <td ><h6 className={styles.td}>Total Output: </h6></td>
                            <td ><h6 className={styles.td}>{this.props.data?.outputTotal}</h6></td>
                          </tr>
                          <tr key={`map-doses`}>
                            <th scope="row" ><h6 className={styles.Id}>5</h6></th>
                            <td ><h6 className={styles.td}>Net Balance: </h6></td>
                            <td ><h6 className={styles.td}>{this.props.data?.netBalance}</h6></td>
                          </tr>
                      </tbody>
                    </table>
                  </div>
            {/* <p>average input: {this.props.data?.avgInputTotal}</p>
              <p>average output: {this.props.data?.avgOutputTotal}</p>
              <p>average input total: {this.props.data?.inputTotal}</p>
              <p>average net balance: {this.props.data?.netBalance}</p>
              <p>average output total: {this.props.data?.outputTotal}</p> */}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Index
