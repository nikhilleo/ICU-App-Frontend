import styles from './typography.module.scss';

interface TypographyInterface {
  children?: any;
  light?: boolean;
  className?: string;
}

const Typography = (props: TypographyInterface) => {
  const {children, className} = props;
  if(!children) {
    return null;
  }
  return (
    <div className={`${styles.default_styles} ${className || ''}`}>
     {children}
    </div>
  )
}

export default Typography;
