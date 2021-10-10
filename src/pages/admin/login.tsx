import { Component } from "react";
import { PhoneIcon } from "components/Icons";
import Input from "components/Input";
import { PasswordIcon } from "components/Icons"
import FormWrapper from "components/FormWrapper";
import { connect } from "react-redux";
import { validateLoginUserData, loginProcess, setLoginError, setLoginUserData } from "redux/login"
import { getLocalStorageItem } from "utils/helper";
import Swal from "sweetalert2";

interface LoginProps {
  router: any;
  setPreLoader: any;
  validateLoginUserData: any;
  setLoginUserData: any;
  setLoginError: any;
  loginProcess: any;
  data: any;
  isLoggedIn: boolean;
  error: object;
}

interface LoginState { }

class Login extends Component<LoginProps, LoginState> {
  state = {};

  componentDidMount() {
    if(this.props.isLoggedIn) {
      Swal.fire({
        title: 'Success',
        icon: 'success',
        showCloseButton: true,
        cancelButtonText: 'Ok',
        html: `You are already Logged In.`,
      })
      this.props.router.replace("/admin/dashboard")
    } 
  }

  onSubmit = async (e: any) => {
    e.preventDefault();
    if (!this.props.validateLoginUserData()) return;
    this.props.setLoginError("", "")
    this.props.setPreLoader(true);
    this.props.loginProcess("admin/login", this.props.setPreLoader, () => {
      this.props.router.replace("/admin/dashboard")
    });
  }

  render() {
    const { mobile, password } = this.props.data;
    return (
      <FormWrapper onSubmit={this.onSubmit} method="Admin Login">
        <div className="w-100 mb-4 pb-2">
          <Input
            Icon={PhoneIcon}
            value={mobile}
            inputProps={{
              placeholder: "MOBILE NO ",
              type: "tel",
              "data-state-key": "mobile"
            }}
            onChange={this.props.setLoginUserData}
            error={this.props.error}
            id="mobile"
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
            onChange={this.props.setLoginUserData}
            error={this.props.error}
            id="password"
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
    data: state.login.userData,
    error: state.login.error,
    isLoggedIn
  }
}

const mapDispatchToProps = {
  validateLoginUserData,
  loginProcess,
  setLoginError,
  setLoginUserData,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);