import styles from "./index.module.scss"

interface RoundedButtonProps {
  active: boolean;
}


export const RoundedButton = ({active}: RoundedButtonProps) => {
  return (
    <button className={`${styles.rounded_btn} ${active && styles.active} `} type="button" />
  )
}
