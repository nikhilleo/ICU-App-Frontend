import Typography from 'components/Typography'
import styles from './index.module.scss'
import { BackArrow, LogoutIcon } from 'components/Icons'

interface DashboardWrapperProps {
  children: any;
  goBack: () => void;
  logout: () => void;
}

const DashboardWrapper = ({ children, goBack, logout }: DashboardWrapperProps) => (
  <div className={`${styles.main}`}>
    <Typography>
      <div className={styles.icon_container}>
        <div onClick={goBack}>
          <BackArrow />
        </div>
        <div onClick={logout}>
          <LogoutIcon />
        </div>
      </div>
      {children}
    </Typography>
  </div>
)

export default DashboardWrapper