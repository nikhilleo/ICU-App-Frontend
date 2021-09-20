import { BlackClockIcon, WhiteClockIcon } from 'components/Icons'
import styles from './index.module.scss'

interface DashboardWrapperProps {
  day: string;
  date: string;
  isActiveDate: boolean;
  isSelected: boolean;
  disabled: boolean;
  onClick: () => any;
}

export const DaysWiseTime = ({ time, onClick, disabled }: any) => {
  if(disabled) {
    console.log(time)
  }
  return (
    <div className={`${styles.time_container} ${disabled ? styles.disabled : ""}`} onClick={!disabled ? onClick : () => { }}>
      <BlackClockIcon /> <span className="ml-3">{time}</span>
    </div>
  )
}

const MonthWiseDays = ({ date, day, isActiveDate, isSelected, disabled, onClick }: DashboardWrapperProps) => (
  <div onClick={!disabled ? onClick : () => { }} className={`${styles.main} ${(isActiveDate || isSelected) ? styles.active : null} ${disabled ? styles.disabled : null} fs-18 lh-20`}>
    <span className="mb-3">{day}</span>
    <span className="mt-1">{date}</span>
  </div>
)

export default MonthWiseDays