import Typography from 'components/Typography'
import {MoreIcon} from 'components/Icons'
import styles from './index.module.scss'
function index() {
  return (
    <Typography>
      <div className="row mt-5 " style={{ minHeight: "540px" }}>
        <div className="col-sm-12">
          <div className=" card-plain table-plain-bg">
            <div className="card-body table-full-width table-responsive">
              <table className="text-center table table-hover align-items-center">
                <thead>
                  <tr><th>ID</th>
                    <th>Patient Name</th>
                    <th>Admission Date</th>
                    <th>Discharge Date</th>
                    <th >Actions</th>
                  </tr></thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Dakota Rice</td>
                    <td>01/12/2021</td>
                    <td>01/12/2021</td>
                    <td ><MoreIcon/></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Minerva Hooper</td>
                    <td>01/12/2021</td>
                    <td>01/12/2021</td>
                    <td ><MoreIcon/></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Sage Rodriguez</td>
                    <td>01/12/2021</td>
                    <td>01/12/2021</td>
                    <td ><MoreIcon/></td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Philip Chaney</td>
                    <td>01/12/2021</td>
                    <td>01/12/2021</td>
                    <td ><MoreIcon/></td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Doris Greene</td>
                    <td>01/12/2021</td>
                    <td>01/12/2021</td>
                    <td ><MoreIcon/></td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Mason Porter</td>
                    <td>01/12/2021</td>
                    <td>01/12/2021</td>
                    <td ><MoreIcon/></td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Mason Porter</td>
                    <td>01/12/2021</td>
                    <td>01/12/2021</td>
                    <td ><MoreIcon/></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Typography>
  )
}

export default index
