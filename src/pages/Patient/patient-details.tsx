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
        <div className={`default-container p-4`}>
          <div className="p-2 align-self-start w-100">
            <p className="text-left small-text normal-black">April 2020</p>
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
