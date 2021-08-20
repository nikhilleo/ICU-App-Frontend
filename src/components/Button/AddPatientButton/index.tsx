import Typography from 'components/Typography'
import { AddIcon } from 'components/Icons'
import styles from './index.module.scss'
function index() {
  return (
    <Typography>
      <div className="col-sm-12 mt-4  " style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div className={`${styles.btn1}`}>
          <span className={`${styles.name}`}>Add Patient</span>
          <AddIcon />
        </div>
      </div>
    </Typography>
  )
}

export default index
