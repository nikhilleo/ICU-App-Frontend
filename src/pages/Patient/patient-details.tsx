import Typography from "components/Typography";
import { Component } from "react";
import { connect } from "react-redux";
import PatientDetail from "components/PatientDetails";

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
        
        <div className={`default-container `}>
          <div className=" align-self-start w-100">
          <PatientDetail/>
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
