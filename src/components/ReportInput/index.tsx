import Typography from "components/Typography";
import styles from "./index.module.scss";

function index({ head, innervalues, type }: any) {
  console.log(innervalues);
  return (
    <div className={`${styles.Maincontainer} container py-2 `}>
      <div> <label><span className="hidden-xs ">
        <h6 className={`${styles.Name}  `} >{head}</h6>
      </span></label>
      </div>
      <div className="row ">
      {innervalues.map((item:{name:string,colSize:number}) => (
        <div className={`col-md-${item.colSize} mt-4`}>
          <div className="input-group">
            <span className="input-group-append">
                <div className={`${styles.input}  input-group-text`}>{item.name}</div>
            </span>
            <input className="form-control py-2 border-right-0 border text-center" type={type} id="example-search-input" />
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default index
