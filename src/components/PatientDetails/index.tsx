import Typography from 'components/Typography'
import styles from './index.module.scss'
import { BackArrow } from 'components/Icons'
function index() {
  return (
    <Typography>
      <div className={`${styles.main} `}>
        <BackArrow/>
      <div className={`${styles.container} `}>
        <img className={`${styles.Img}`}  src="../images/doctor.png" alt="" />
          <div className={`${styles.Info} `}>
            <p className= "ml-4 d-flex  fs-20 lh-20">Patient Id :-</p>
            <p className="ml-4 d-flex  fs-20 lh-20">Patient Name :-</p>
            <p className="ml-4 d-flex  fs-20 lh-20">Age :-</p>
            <p className="ml-4 d-flex  fs-20 lh-20">Sex :-</p>
         </div>
      </div>
      </div>
    </Typography>
  )
}

export default index
