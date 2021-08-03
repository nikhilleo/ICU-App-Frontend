import styles from './index.module.scss'

interface ButtonProps {
  children: any;
  onClick: any;
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
      <button onClick={onClick} className={`${styles.btnContainer} normal-text`}>
        {children}
      </button>
  )
}

export default Button