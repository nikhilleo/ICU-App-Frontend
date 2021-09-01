import styles from './index.module.scss'

interface ButtonProps {
  children: any;
  onClick?: any;
  props?: any;
}

const Button = ({ children, onClick, props }: ButtonProps) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={`${styles.btnContainer} normal-text`}
    >
      {children}
    </button>
  )
}

export default Button