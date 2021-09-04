import { Component } from "react";
import IntroScreenDashboard from 'components/IntroScreenDashboard'
import axios from '../../axios';
import { getLocalStorageItem } from "utils/helper";

interface IntroProps {
  router: any;
};

interface IntroState {};

class Intro extends Component<IntroProps, IntroState> {
  state = {};
  
  componentDidMount() {
    let token = localStorage.getItem("token");
    let userDetails = JSON.parse(getLocalStorageItem('user-details') || "{}");
    axios.get(`/${userDetails.role}/auth`, {
      headers: { Authorization: token, role: userDetails.role },
    })
      .then((res: any) => {
        if (res.data.success) {
          if (res.data.role == "nurse") this.props.router.replace("/nurse/dashboard")
          else this.props.router.replace("/admin/dashboard")
        }
        else {
          this.props.router.replace("/intro/2")
        }
      }).catch((err: any) => {
        if(err.response.data?.message == "jwt expired") {
          localStorage.removeItem("token");
          localStorage.removeItem("user-details");
        } 
        this.props.router.replace("/Intro/2")
      })
  }

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
