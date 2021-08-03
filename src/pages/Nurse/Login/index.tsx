import { Component } from "react";
import { PhoneIcon } from "components/Icons";
import Input from "components/Input";
import { PasswordIcon } from "components/Icons"
import FormWrapper from "components/FormWrapper";
import { connect } from "react-redux";
import { validateLoginUserData, loginProcess, setLoginError, setLoginUserData } from "redux/login"

interface LoginProps {
  router: any;
  validateLoginUserData: any;
  setLoginUserData: any;
  setLoginError: any;
  loginProcess: any;
  data: any;
  error: object;
}

interface LoginState { }

class Login extends Component<LoginProps, LoginState> {
  state = {};

  onSubmit = async () => {
    if (!this.props.validateLoginUserData()) return;
    this.props.setLoginError("", "")
    this.props.loginProcess(() => {
      this.props.router.replace("/Patient")
    });
  }

  render() {
    const { mobile, password } = this.props.data;
    return (
      <FormWrapper onSubmit={this.onSubmit} method="Login">
        <div className="w-100 mb-4 pb-2">
          <Input
            Icon={PhoneIcon}
            value={mobile}
            inputProps={{
              placeholder: "MOBILE NO ",
              type: "number",
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
  return {
    data: state.login.userData,
    error: state.login.error
  }
}

const mapDispatchToProps = {
  validateLoginUserData,
  loginProcess,
  setLoginError,
  setLoginUserData,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);