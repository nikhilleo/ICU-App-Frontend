import { BlackClockIcon, WhiteClockIcon } from 'components/Icons'
import { useEffect } from 'react'
import styles from './index.module.scss'

interface DashboardWrapperProps {
  day: string;
  date: string;
  isSelected: boolean;
  disabled: boolean;
  onClick: () => any;
  key: string;
}

interface DayWiseTimeProps {
  time: string;
  onClick: any;
  disabled: boolean;
  isSelected: boolean;
}

export const DaysWiseTime = ({ time, onClick, disabled, isSelected }: DayWiseTimeProps) => {
  return (
    <div
      className={`${styles.time_container} ${isSelected ? styles.active : null} ${disabled ? styles.disabled : ""}`}
      onClick={!disabled ? onClick : () => { }}
    >
      {isSelected ? <WhiteClockIcon /> : <BlackClockIcon />} <span className="ml-3">{time}</span>
    </div>
  )
}

const MonthWiseDays = ({ date, day, isSelected, disabled, onClick, key }: DashboardWrapperProps) => {
  useEffect(() => {
    var element: any = document.getElementById("scrollHere");
    if (element) {
      element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }
  }, [isSelected])

  return (
  <div
    onClick={!disabled ? onClick : () => { }}
    id={isSelected ? "scrollHere": ""}
    key={key}
    className={`${styles.main} ${(isSelected) ? styles.active : null} ${disabled ? styles.disabled : null} fs-18 lh-20`}
  >
    <span className="mb-3">{day}</span>
    <span className="mt-1">{date}</span>
  </div>
)}

export default MonthWiseDays