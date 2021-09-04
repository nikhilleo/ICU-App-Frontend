import styles from './index.module.scss'

interface CategoryProps {
  Icon: any;
	title: string,
	totalDoctors: string,
}

const Category = ({ Icon, title, totalDoctors }: CategoryProps) => {
  return (
    <div className={`${styles.container} extra-small-text`}>
      <div className={styles.icon_container}>
      <Icon />
      </div>
      <p className={`${styles.content} Roboto text-center mt-3 fs-16 mb-0`}>{title}</p>
    </div>
  )
}

export default Category