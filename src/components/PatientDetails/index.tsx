import Typography from 'components/Typography'
import styles from './index.module.scss'
import { BackArrow } from 'components/Icons'
function index() {
  return (
    <Typography>
      <div className={`${styles.main}`} >
        <BackArrow />
        <div className={`${styles.container} row no-gutters align-items-center  justify-content-center `}>
          <div className="col-sm-2   " style={{ width: "110px" }}>
            <img className="card-img " src="../images/doctor.png" alt="Suresh Dasari Card" />
          </div>
          <div className="col-sm-6 mt-2   col-lg-8">
            <p className="ml-4 d-flex   fs-20 lh-20">Patient Id :-</p>
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

