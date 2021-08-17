import styles from './index.module.scss'

interface CategoryProps {
  Icon: any;
	title: string,
	totalDoctors: string,
}

const Category = ({ Icon, title, totalDoctors }: CategoryProps) => {
  return (
    <div className={`${styles.container} extra-small-text`}>
      <div className="mt-3">
      <Icon />
      </div>
      <p className="Roboto mt-3 fs-16">{title}</p>
      <p className="Roboto-light fs-10">{totalDoctors}</p>
    </div>
  )
}

export default Category