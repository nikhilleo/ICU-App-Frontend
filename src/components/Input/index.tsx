import { SearchIcon } from 'components/Icons';
import React, { CSSProperties, useEffect } from 'react'
import styles from './index.module.scss'

interface InputProps {
  Icon?: any;
	inputProps?: any,
	onChange?: Function,
  style?: CSSProperties;
  error?: object;
  id?: string;
  value?: string;
}

const getErrorMessage = (error: any, id: any) => {
  if (error) {
    if(typeof error === 'object') {
      return error[id] ? (error[id] || '') : (error.message || '');
    }
    return error;
  }
  return '';
}

export const ErrorWrap = ({ error, id, children }: any) => {
  const errorMessage = getErrorMessage(error, id);
  const ref = React.createRef<HTMLDivElement>();
  useEffect(() => {
    if (ref && ref.current && ref.current.scrollIntoView && errorMessage) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [errorMessage]);
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {children || null}
      {errorMessage && <p className={`text-danger mb-0 mt-0 ${styles.input_error_msg}`}>{errorMessage}&nbsp;</p>}
    </div>
  )
}

export const SearchBar = () => (
  <div className="input-group mb-3 w-100">
    <input
      type="text"
      className={`${styles.search_input} small-text form-control`}
      placeholder="Search..."
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
    />
    <div className="input-group-append">
      <span
        className={`${styles.search_icon} input-group-text p-3`}
        id="basic-addon2"
      >
        <SearchIcon />
      </span>
    </div>
  </div>
)

const Input = ({ Icon, style, inputProps, onChange, error, id, value }: InputProps) => {
  return (
    <ErrorWrap id={id} error={error}>
      <div className={styles.inputContainer} style={style}>
        {Icon ? (
          <span className={styles.inputIcon}><Icon /></span>
        ) : null}
        <input
          className={`${styles.mainInput} extra-small-text lh-20`}
          {...(inputProps || {})}
          onChange={onChange}
          value={value}
        />
      </div>
    </ErrorWrap>
  )
}

export default Input