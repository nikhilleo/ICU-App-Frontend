import { CSSProperties } from 'react'
import styles from './index.module.scss'

interface LogoWrapperProps {
  children: any;
  style?: CSSProperties;
}

const LogoWrapper = ({children, style}: LogoWrapperProps) => {
  return(
    <div className={styles.logo_container} style={style}>
      {children}
      <img className="mt-3" src="/Images/CloudNxtLogo.png" />
    </div>
  )
}

export default LogoWrapper