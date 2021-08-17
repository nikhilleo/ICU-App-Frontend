import Category from "components/Category";
import PatientCard from "components/PatientCard";
import { BoneIcon, BrainIcon, DentalIcon, HeartIcon } from "components/Icons";
import { SearchBar } from "components/Input";
import Typography from "components/Typography";
import { Component } from "react";
import { connect } from "react-redux";

interface PatientProps {
  router: any;
}

interface PatientState {
}

class Patient extends Component<PatientProps, PatientState> {
  state = {
    data: {}
  }

  render() {
    return (
      <Typography>
        <div style={{ backgroundClip: "red", height:"20%" }} className="w-100"></div>
        <div className={`default-container p-4`}>
          <div className="p-2 align-self-start w-100">
            <p className="normal-text normal-black lh-40 pb-5">Hi, Olivia Welcome Back</p>
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
                  title="Dental"
                  totalDoctors="26 Doctors"
                />
              </div>
              <div className="mr-3 pr-1">
                <Category
                  Icon={HeartIcon}
                  title="Heart"
                  totalDoctors="18 Doctors"
                />
              </div>
              <div className="mr-3 pr-1">
                <Category
                  Icon={BrainIcon}
                  title="Brain"
                  totalDoctors="32 Doctors"
                />
              </div>
              <div className="mr-3 pr-1">
                <Category
                  Icon={BoneIcon}
                  title="Bone"
                  totalDoctors="21 Doctors"
                />
              </div>
              <div className="mr-3 pr-1">
                <Category
                  Icon={DentalIcon}
                  title="Dental"
                  totalDoctors="26 Doctors"
                />
              </div>
            </div>
            <div className="d-flex justify-content-between my-4 py-1 small-text normal-black">
              <span>Patient List</span>
              <span>See all</span>
            </div>
            <div>
              <PatientCard name="Dr. Fred Mask" />
              <PatientCard name="Dr. Fred Mask" />
              <PatientCard name="Dr. Fred Mask" />
              <PatientCard name="Dr. Fred Mask" />
              <PatientCard name="Dr. Fred Mask" />
              <PatientCard name="Dr. Fred Mask" />
              <PatientCard name="Dr. Fred Mask" />
              <PatientCard name="Dr. Fred Mask" />
              <PatientCard name="Dr. Fred Mask" />
              <PatientCard name="Dr. Fred Mask" />
              <PatientCard name="Dr. Fred Mask" />
              <PatientCard name="Dr. Fred Mask" />
              <PatientCard name="Dr. Fred Mask" />
              <PatientCard name="Dr. Fred Mask" />
            </div>
          </div>
        </div>
      </Typography>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
