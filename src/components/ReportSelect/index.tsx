
import styles from "./index.module.scss";

function index({ head, innervalues }) {
  console.log(innervalues);
  return (
    <div className={`${styles.Maincontainer} container py-2 `}>
      <div> <label><span className="hidden-xs ">
        <h6 className={`${styles.Name}  `} >{head}</h6>
      </span></label>
      </div>
      <div className="row ">
      {innervalues.map((item:{Modename:string,colSize:number}) => (
        <div className={`col-md-${item.colSize} mt-4 `}>
          <label  className={`${styles.Modeame} container `}>{item.Modename}
          <input type="checkbox"  className={styles.checkbox} />
          <span  className="checkmark " />
        </label>
       
        </div>
      ))}
      </div>
    </div>
  )
}

export default index

