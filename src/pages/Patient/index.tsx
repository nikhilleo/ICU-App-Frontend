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
      <h1>
        this is patient details page
      </h1>
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