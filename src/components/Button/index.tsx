import styles from './index.module.scss'

interface ButtonProps {
  children: any;
  onClick?: any;
  props?: any;
}

interface RoundedButtonProps {
  active: boolean;
}

export const RoundedButton = ({active}: RoundedButtonProps) => {
  return (
    <button className={`${styles.rounded_btn} ${active && styles.active} `} type="button" />
  )
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