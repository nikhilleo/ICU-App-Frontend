import ButtonWithIcon from 'components/Button/ButtonWithIcon'
import { RightArrow } from 'components/Icons'
import styles from './index.module.scss'

interface CategoryProps {
	name: string;
}

const Category = ({ name }: CategoryProps) => {
  return (
    <div style={{ minWidth: "100%" }} className="mb-3 overflow-auto">
      <div className={`${styles.container} d-flex overflow-auto`}>
        <img className="mr-4" src="../images/profile.png" alt="" />
        <p className="ml-4 normal-black fs-20 lh-20">{name}</p>
        <div className={styles.btn}>
          <ButtonWithIcon Icon={RightArrow}>
            <span className="fs-12">Open Details</span>
          </ButtonWithIcon>
        </div>
        {/* <button className={`Roboto ${styles.btn} fs-12`}><RightArrow /></button> */}
      </div>
    </div>
  )
}

export default Category