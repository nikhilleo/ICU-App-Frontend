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
        title="Hospital Patient Details"
        src="/Images/Intro3.png"
        introScreen={3}
        router={this.props.router}
        imgStyles={{ maxHeight: "402px", width: "100%" }}
      />
    )
  }
}

export default Intro
