import { HeartWhiteIcon } from 'components/Icons'
import LogoWrapper from 'components/LogoWrapper';
import Typography from 'components/Typography'
import { Component } from 'react';
import styles from 'styles/Home.module.css'

interface HomeProps {
  router: any;
};

interface HomeState {
  time: any;
};

class Home extends Component<HomeProps, HomeState> {
  timer: any = null;

  state = {
    time: 2
  };

  componentDidMount() {
    this.setTimer();
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  setTimer = () => {
    if (this.state.time > 0 && !this.timer) {
      this.timer = setInterval(this.timerHandler, 1000);
    }
  }

  timerHandler = () => {
    if (this.state.time < 1 && this.timer) {
      clearInterval(this.timer);
      this.props.router.replace("/Intro/1")
      return;
    }
    this.setState(prevState => ({ time: Math.max(prevState.time - 1, 0) }))
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
