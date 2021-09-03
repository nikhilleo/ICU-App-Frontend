import { HeartWhiteIcon } from 'components/Icons'
import LogoWrapper from 'components/LogoWrapper';
import Typography from 'components/Typography'
import { Component } from 'react';
import styles from 'styles/Home.module.css'
import { getLocalStorageItem } from 'utils/helper';
import axios from '../axios';

interface HomeProps {
  router: any;
};

interface HomeState { };

class Home extends Component<HomeProps, HomeState> {

  componentDidMount() {
    let token = localStorage.getItem("token");
    let userDetails = JSON.parse(getLocalStorageItem('user-details') || "{}");
    console.log(userDetails)
    
    axios.get(`/${userDetails.role}/auth`, {
      headers: { Authorization: token, role: userDetails.role },
    })
      .then((res: any) => {
        console.log(res)
        if (res.data.success) {
          if (res.data.role == "nurse") this.props.router.replace("/nurse/dashboard")
          else this.props.router.replace("/admin/dashboard")
        }
        else {
          this.props.router.replace("/intro/1")
        }
      }).catch((err: any) => {
        console.log(err.response)
        if(err.response.data?.message == "jwt expired") {
          localStorage.removeItem("token");
          localStorage.removeItem("user-details");
        } 
        this.props.router.replace("/intro/1")
      })
  }

  render() {
    return (
      <Typography>
        <div className={styles.container}>
          <div className={styles.heart_container}>
            <HeartWhiteIcon />
          </div>
          <p className="text-center head-text mt-5 pt-4">ICU APP</p>
          <LogoWrapper style={{ position: "absolute", bottom: "0px" }}>
            <p className="text-center small-text lh-30">Powered By</p>
          </LogoWrapper>
        </div>
      </Typography>
    )
  }
}

export default Home
