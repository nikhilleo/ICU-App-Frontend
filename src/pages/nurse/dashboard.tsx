import Category from "components/Category";
import PatientCard from "components/PatientCard";
import { BoneIcon, BrainIcon, DentalIcon, HeartIcon } from "components/Icons";
import { SearchBar } from "components/Input";
import Typography from "components/Typography";
import { Component } from "react";
import { connect } from "react-redux";
import { getLocalStorageItem } from "utils/helper";
import axios from "../../axios";
import Loader from "components/Loader";
import { BackArrow, LogoutIcon } from 'components/Icons'
import NurseHeader from "components/NurseHeader"

interface PatientProps {
  router: any;
  role: string;
  currentUserDetails: any;
  setPreLoader: any;
}

interface PatientState {
  data: object[]
}

class Patient extends Component<PatientProps, PatientState> {
  state = {
    data: []
  }

  componentDidMount() {
    if (!this.props.role || this.props.role == "admin") this.props.router.replace("/")
    else {
      const token = getLocalStorageItem("token")
      const userDetails = JSON.parse(getLocalStorageItem("user-details") || "");
      axios.get("/patient/getAllPatient", {
        headers: { Authorization: token, role: userDetails.role },
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

  handleClick = (e: any, item: any) => {
    e.preventDefault();
    this.props.router.push(`/patient/patient-details/${item._id}`)
  }

  render() {
    const { currentUserDetails } = this.props
    if (this.state.data.length < 1) {
      return (
        <Loader />
      )
    }

    return (
      <Typography>
       <NurseHeader router={this.props.router} />
        <div
          className={`default-container p-4`}
          style={{
            marginTop: "-21vh",
            borderTopLeftRadius: "42px",
            borderTopRightRadius: "42px"
          }}
        >
          <div style={{ backgroundColor: "blue" }} className="w-100"></div>
          <div className="p-2 align-self-start w-100">
            <p className="normal-text normal-black lh-40 pb-5">
              Hi, {currentUserDetails.fName} Welcome Back
            </p>
            <div className="mt-5">
              <SearchBar />
            </div>
            <div className="d-flex justify-content-between my-4 py-1 small-text normal-black">
              <span>Category</span>
              <span>See all</span>
            </div>
            <div style={{ minWidth: "100%" }} className="d-flex hide-scroll overflow-auto">
              <div className="mx-3 px-1">
                <Category
                  Icon={DentalIcon}
                  title="Infection Control Management"
                  totalDoctors="26 Doctors"
                />
              </div>
              <div className="mr-3 pr-1">
                <Category
                  Icon={HeartIcon}
                  title="Inventory Management"
                  totalDoctors="18 Doctors"
                />
              </div>
              <div className="mr-3 pr-1">
                <Category
                  Icon={BrainIcon}
                  title="Maintenance Management"
                  totalDoctors="32 Doctors"
                />
              </div>
              <div className="mr-3 pr-1">
                <Category
                  Icon={BoneIcon}
                  title="Feddback Form"
                  totalDoctors="21 Doctors"
                />
              </div>
              <div className="mr-3 pr-1">
                <Category
                  Icon={DentalIcon}
                  title="Incident Management"
                  totalDoctors="26 Doctors"
                />
              </div>
            </div>
            <div className="d-flex justify-content-between my-4 py-1 small-text normal-black">
              <span>Patient List</span>
              <span>See all</span>
            </div>
            <div>
              {this.state.data.map((item: any) => (
                <PatientCard
                  onClick={(e: any) => this.handleClick(e, item)}
                  name={`${item.fName} ${item.lName}`}
                  src={item.patinet_image}
                />
              ))}
            </div>
          </div>
        </div>

      </Typography>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  const currentUserDetails = JSON.parse(getLocalStorageItem('user-details') || "{}");
  return {
    role: currentUserDetails && currentUserDetails.role,
    currentUserDetails
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
