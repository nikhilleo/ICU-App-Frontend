import CategoryCard from "components/CategoryCard";
import PatientCard from "components/PatientCard";
import { BackArrow, BoneIcon, BrainIcon, DentalIcon, HeartIcon, LogoutIcon } from "components/Icons";
import { SearchBar } from "components/Input";
import Typography from "components/Typography";
import { Component } from "react";
import { connect } from "react-redux";
import { getLocalStorageItem } from "utils/helper";
import axios from "../../axios";
import Loader from "components/Loader";
import Swal from "sweetalert2";
import { clearUserData } from "redux/login"

interface PatientProps {
  router: any;
  role: string;
  currentUserDetails: any;
  setPreLoader: any;
  clearUserData: any;
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
      this.props.setPreLoader(true);
      axios.get("/patient/getAllPatient", {
        headers: { Authorization: token },
      })
        .then((res: any) => {
          this.props.setPreLoader(false);
          this.setState({
            data: res.data?.allPatient
          })
        })
        .catch((err: any) => {
          this.props.setPreLoader(false);
          Swal.fire({
            title: 'Error',
            icon: 'error',
            showCloseButton: true,
            cancelButtonText: 'Ok',
            html: `<p>Please Login again and Retry</p>`,
          })
          localStorage.clear();
          this.props.router.replace("/");
        })
    }
  }

  handleClick = (e: any, item: any) => {
    e.preventDefault();
    this.props.router.push(`/patient/patient-details/${item._id}`)
    localStorage.setItem("patient-id", item._id)
  }

  goBack = () => {
    this.props.router.back();
  }

  logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You're about to signed out!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, sign out!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        this.props.clearUserData();
        this.props.router.replace("/nurse/login")
        Swal.fire(
          'Signed Out!',
        )
      }
    })
  }

  render() {
    const { currentUserDetails } = this.props
    return (
      <Typography>
        <div className="w-100 m-auto" style={{ backgroundColor: "#232EAF", maxWidth: "768px", minHeight: "30vh" }}>
          <div className="py-3 px-4 d-flex justify-content-between w-100">
            <div className="cursor-pointer" style={{ width: "19px" }} onClick={this.goBack}>
              <BackArrow />
            </div>
            <div className="cursor-pointer" style={{ width: "19px" }} onClick={this.logout}>
              <LogoutIcon />
            </div>
          </div>
        </div>
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
                <CategoryCard
                  Icon={DentalIcon}
                  title="Infection Control Management"
                  totalDoctors="26 Doctors"
                />
              </div>
              <div className="mr-3 pr-1">
                <CategoryCard
                  Icon={HeartIcon}
                  title="Inventory Management"
                  totalDoctors="18 Doctors"
                />
              </div>
              <div className="mr-3 pr-1">
                <CategoryCard
                  Icon={BrainIcon}
                  title="Maintenance Management"
                  totalDoctors="32 Doctors"
                />
              </div>
              <div className="mr-3 pr-1">
                <CategoryCard
                  Icon={BoneIcon}
                  title="Feedback Form"
                  totalDoctors="21 Doctors"
                />
              </div>
              <div className="mr-3 pr-1">
                <CategoryCard
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
  clearUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
