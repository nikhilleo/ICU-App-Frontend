import { Component } from "react";
import { PhoneIcon, ProfileIcon } from "components/Icons";
import Input from "components/Input";
import { PasswordIcon } from "components/Icons"
import FormWrapper from "components/FormWrapper";
import { connect } from "react-redux";
import { validateSignUpUserData, setSignUpUserData, setSignUpError, signUpProcess } from "redux/signup";
import { getLocalStorageItem } from "utils/helper";

interface LoginProps {
  router: any;
  setPreLoader: any;
  data: any;
  setSignUpUserData: any;
  setSignUpError: any;
  validateSignUpUserData: any;
  signUpProcess: any;
  error: object;
  role: string;
}

interface LoginState {
  data: object;
}

class Register extends Component<LoginProps, LoginState> {
  state = {
    data: {}
  }

  componentDidMount() {
    if(!this.props.role || this.props.role != "admin") this.props.router.replace(`/`)
  }

  onSubmit = async (e: any) => {
    e.preventDefault();
    if (!this.props.validateSignUpUserData()) return;
    this.props.setSignUpError("", "")
    this.props.setPreLoader(true);
    this.props.signUpProcess("nurse/signup", this.props.setPreLoader, () => {
      this.props.router.replace("/nurse/dashboard")
    });
  }

  render() {
    const { fName, lName, mobile, password } = this.props.data;
    return (
      <FormWrapper onSubmit={this.onSubmit} method="Nurse Register">
        <div className="w-100 mb-4 pb-2">
          <Input
            Icon={ProfileIcon}
            value={fName}
            inputProps={{
              placeholder: "FIRST NAME",
              type: "text",
              "data-state-key": "fName"
            }}
            onChange={this.props.setSignUpUserData}
            error={this.props.error}
            id="signup-firstname"
          />
        </div>
        <div className="w-100 mb-4 pb-2">
          <Input
            Icon={ProfileIcon}
            value={lName}
            inputProps={{
              placeholder: "LAST NAME",
              type: "text",
              "data-state-key": "lName"
            }}
            onChange={this.props.setSignUpUserData}
            error={this.props.error}
            id="signup-lastname"
          />
        </div>
        <div className="w-100 mb-4 pb-2">
          <Input
            Icon={PhoneIcon}
            value={mobile}
            inputProps={{
              placeholder: "MOBILE",
              type: "tel",
              "data-state-key": "mobile"
            }}
            onChange={this.props.setSignUpUserData}
            error={this.props.error}
            id="signup-mobile"
          />
        </div>
        <div className="w-100">
          <Input
            Icon={PasswordIcon}
            value={password}
            inputProps={{
              placeholder: "PASSWORD",
              type: "password",
              "data-state-key": "password"
            }}
            onChange={this.props.setSignUpUserData}
            error={this.props.error}
            id="signup-password"
          />
        </div>
      </FormWrapper>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  const currentUserDetails = JSON.parse(getLocalStorageItem('user-details') || "{}");
  const  isLoggedIn = Boolean(currentUserDetails && currentUserDetails.mobile)
  return {
    data: state.signUp.userData,
    error: state.signUp.error,
    isLoggedIn,
    role: (isLoggedIn && currentUserDetails.role) || null 
  }
}

const mapDispatchToProps = {
  setSignUpUserData,
  setSignUpError,
  validateSignUpUserData,
  signUpProcess,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);