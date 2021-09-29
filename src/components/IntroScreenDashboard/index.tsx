import { RoundedButton } from 'components/Button'
import { HeartBlueIcon } from 'components/Icons'
import LogoWrapper from 'components/OwnerLogoWrapper'
import Typography from 'components/Typography'
import { CSSProperties } from 'react'
import styles from './index.module.scss'

interface DashboardProps {
  title: string;
  src: string;
  introScreen: number;
  router: any;
  imgStyles?: CSSProperties;
}

function Index({title, src, introScreen, router, imgStyles} : DashboardProps) {
  const handleNextClick = () => {
    if(introScreen > 2) {
      goToLoginPage();
      return;
    }
    router.replace(`/Intro/${introScreen + 1}`)
  }

  const goToLoginPage = () => {
    router.replace(`/nurse/login`)
  }

  return (
    <Typography>
      <div className="default-container">
        <div className="my-5 py-5 d-flex flex-column align-items-center">
          <div className="mb-4">
            <HeartBlueIcon />
          </div>
          <p className="normal-text blue lh-40 mb-4 pb-2">LIFELINE APP</p>
          <p className="text-center normal-text dark-blue lh-40">{title}</p>
        </div>
        <div className={styles.img_container}>
          <img style={imgStyles} src={src} />
        </div>
        <LogoWrapper style={{ position: "absolute", bottom: "0px" }}>
          <div className={`${styles.intro_footer} mt-3`}>
            <span
              className={`${styles.skip_content} blue normal-text`}
              onClick={goToLoginPage}
            >
              Skip
            </span>
            <div>
              <RoundedButton active={introScreen == 1} />
              <RoundedButton active={introScreen == 2} />
              <RoundedButton active={introScreen == 3} />
            </div>
            <span
              className={`${styles.next_content} blue normal-text`}
              onClick={handleNextClick}
            >
              Next
            </span>
          </div>
        </LogoWrapper>
      </div>
    </Typography>
  )
}

export default Index
