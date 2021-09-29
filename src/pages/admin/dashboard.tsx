import Typography from 'components/Typography'
import PatientDashboard from 'components/PatientDashboard'
import PatientDashboardTable from 'components/PatientDashboardTable'
import ButtonWithIcon from 'components/Button/ButtonWithIcon'
import { AddIcon } from 'components/Icons'
import Link from "next/link"
import { Component } from 'react'
import { connect } from 'react-redux'
import { getLocalStorageItem } from 'utils/helper'
import axios from "../../axios"
import Loader from 'components/Loader'

interface DashboardProps {
  router: any;
  isLoggedIn: boolean;
  setPreLoader: any;
}

interface DashboardState {
  data: object[];
}

class Dashboard extends Component<DashboardProps, DashboardState> {

  state = {
    data: []
  }

  componentDidMount() {
    if (!this.props.isLoggedIn) this.props.router.replace("/")
    else {
      const token = localStorage.getItem("token")
      axios.get("/patient/getAllPatient", {
        headers: { Authorization: token },
      })
        .then((res: any) => {
          this.setState({
            data: res.data?.allPatient
          })
        })
        .catch((err: any) => {
        })
    }
  }

  render() {
    if (this.state.data.length < 1) {
      return (
        <Loader />
      )
    }
    return(
    <Typography>
      <div className="default-container">
        <div className="mb-3 w-100">
          <PatientDashboard router={this.props.router} />
        </div>
        <div className="d-flex justify-content-between mt-4 w-100">
          <Link href="/admin/add-nurse">
            <ButtonWithIcon className="ml-3" Icon={AddIcon}>
              <span className="fs-16">Add Nurse</span>
            </ButtonWithIcon>
          </Link>
          <Link href="/admin/add-patient">
            <ButtonWithIcon className="mr-3" Icon={AddIcon}>
              <span className="fs-16">Add Patient</span>
            </ButtonWithIcon>
          </Link>
        </div>
        <div className="mt-4 align-self-start w-100 overflow-hidden ">
          <PatientDashboardTable router={this.props.router} data={this.state.data} />
        </div>
      </div>
    </Typography>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  const currentUserDetails = JSON.parse(getLocalStorageItem('user-details') || "{}");
  return {
    isLoggedIn: Boolean(currentUserDetails && currentUserDetails.role == "admin")
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


