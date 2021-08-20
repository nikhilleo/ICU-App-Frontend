import Typography from 'components/Typography'
import styles from './index.module.scss'
import { PaginationNextArrow } from 'components/Icons'
import {PaginationPreviewArrow} from 'components/Icons'
function index() {
  return (
    <Typography>
      <div className={`${styles.pagination}`}>
      <span><PaginationPreviewArrow/></span>
        <span className={`${styles.paginationinner}`} >
          <a href="#">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
         
        </span> 
        <span><PaginationNextArrow/></span> 
      </div>
    </Typography>
  )
}

export default index