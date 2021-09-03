import Typography from 'components/Typography'
import styles from './index.module.scss'
import { BackArrow } from 'components/Icons'

function index({
  id,
  name,
  age,
  gender,
  src
}: any) {
  return (
    <Typography>
      <div className={`${styles.main}`} style={{ minHeight: "336px" }} >
        <div className={`${styles.container} row no-gutters align-items-center  justify-content-center `}>
          <div className="col-sm-2   " style={{ width: "110px" }}>
            <img className="card-img " src={src ? src : "/Images/doctor.png"} alt="Suresh Dasari Card" />
          </div>
          <div className="col-sm-6 mt-3   col-lg-8">
            <p className="ml-4 d-flex   fs-20 lh-20">Patient Id :- {id}</p>
            <p className="ml-4 d-flex  fs-20 lh-20">Patient Name :- {name}</p>
            <p className="ml-4 d-flex  fs-20 lh-20">Age :- {age}</p>
            <p className="ml-4 d-flex  fs-20 lh-20">Sex :- {gender}</p>
          </div>
        </div>
      </div>
    </Typography>
  )
}

export default index