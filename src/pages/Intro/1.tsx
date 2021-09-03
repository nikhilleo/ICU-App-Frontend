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
        title="Doctor Details"
        src="/Images/Intro1.png"
        introScreen={1}
        router={this.props.router}
        imgStyles={{width: "100%"}}
      />
    )
  }
}

export default Intro
