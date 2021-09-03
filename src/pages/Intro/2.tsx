import { Component } from "react";
import IntroScreenDashboard from 'components/IntroScreenDashboard'

interface IntroProps {
  router: any;
};

interface IntroState {};

class Intro extends Component<IntroProps, IntroState> {
  state = {};
  render() {
    return (
      <IntroScreenDashboard
        title="Nurse Details"
        src="/Images/Intro2.png"
        introScreen={2}
        router={this.props.router}
        imgStyles={{ maxHeight: "402px", width: "100%"}}
      />
    )
  }
}

export default Intro
