import { RightArrow } from 'components/Icons'
import styles from './index.module.scss'

interface CategoryProps {
	name: string;
}

const Category = ({ name }: CategoryProps) => {
  return (
    <div style={{ minWidth: "100%" }} className="mb-3 overflow-auto">
      <div className={`${styles.container} d-flex overflow-auto`}>
        <img className="mr-4" src="images/profile.png" alt="" />
        <p className="ml-4 normal-black fs-20 lh-20">{name}</p>
        <button className={`Roboto ${styles.btn} fs-10`}><span>Open Details</span> <RightArrow /></button>
      </div>
    </div>
  )
}

export default Category