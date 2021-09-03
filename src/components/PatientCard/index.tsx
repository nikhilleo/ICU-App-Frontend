import ButtonWithIcon from 'components/Button/ButtonWithIcon'
import { RightArrow } from 'components/Icons'
import styles from './index.module.scss'

interface CategoryProps {
	name: string;
  src: string;
  onClick: any;
}

const Category = ({ name, src, onClick }: CategoryProps) => {
  return (
    <div style={{ minWidth: "100%" }} className="mb-3 overflow-auto">
      <div className={`${styles.container} d-flex overflow-auto`}>
        <img className={styles.patient_profile} src={src ? src : "Images/profile.png"} alt="profile" />
        <p className="ml-4 normal-black fs-20 lh-20">{name}</p>
        <div className={styles.btn}>
          <ButtonWithIcon onClick={onClick} Icon={RightArrow}>
            <span className="fs-12">Open Details</span>
          </ButtonWithIcon>
        </div>
        {/* <button className={`Roboto ${styles.btn} fs-12`}><RightArrow /></button> */}
      </div>
    </div>
  )
}

export default Category