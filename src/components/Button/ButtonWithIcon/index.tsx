import styles from './index.module.scss'

interface ButtonButtonWithIconProps {
  children: any;
  onClick?: any;
  props?: any;
  Icon: any;
  className?: string;
}

const ButtonWithIcon = ({ children, onClick, props, Icon, className }: ButtonButtonWithIconProps) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={`Roboto normal-text ${styles.btnContainer} ${className ? className : ""}`}
    >
      {children}
      <Icon />
    </button>
  )
}

export default ButtonWithIcon