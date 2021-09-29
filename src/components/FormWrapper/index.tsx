import Button from "components/Button"
import { HeartBlueIcon } from "components/Icons"
import LogoWrapper from "components/OwnerLogoWrapper"
import Typography from "components/Typography"

const FormWrapper = ({ children, method, onSubmit }: any) => {
  return(
    <Typography>
      <form onSubmit={onSubmit} className={`px-md-5 default-container`}>
        <div className="px-5 my-5 py-md-5 d-flex flex-column align-items-center w-100">
          <div className="mb-4">
            <HeartBlueIcon />
          </div>
          <p className="normal-text blue lh-40 mb-5 pb-4">LIFELINE APP</p>
          <p className="head-text mb-5 pb-3 dark-blue lh-40">{method}</p>
          {children}
          <div className="w-100 my-5 pb-4">
            <Button
              props={{
                type: "submit"
              }}
            >
              Continue
            </Button>
          </div>
          <LogoWrapper>
            <p className="Roboto-medium dark-black lh-30 small-text text-center">
              By signing in, you accept our {" "}
              <a className="blue" href="#">
                Terms and Conditions
              </a>
            </p>
          </LogoWrapper>
        </div>
      </form>
    </Typography>
  )
}

export default FormWrapper