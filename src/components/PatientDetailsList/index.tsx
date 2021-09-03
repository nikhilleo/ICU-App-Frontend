import Typography from "components/Typography";
import styles from "./index.module.scss";
import { TelescopeIcon } from "components/Icons";
import { SyringeIcon } from "components/Icons";
import { HeartIcon1 } from "components/Icons";

function index({Icon, title, count}: any) {
  return (
    <Typography>
      <div className={`${styles.mainList}   `}>
        <div className=" col d-flex hide-scroll justify-content-between overflow-auto p-0">
          <div>
            <div className={`${styles.container2}  `}>
              <div className={`${styles.List2} `}>
                <div>
                  <p
                    className="d-flex fs-20 lh-9 Roboto"
                    style={{
                      color: "#8288AC",
                      fontSize: "15px",
                      marginTop: "5px",
                      marginLeft: "30px",
                      textAlign: "center",
                    }}
                  >
                    {title}
                  </p>
                  <p
                    className="  d-flex fs-17 lh-9 Roboto"
                    style={{
                      color: "#BCBDC3",
                      marginLeft: "68px",
                      marginTop: "-19px",
                    }}
                  >
                    {count}
                  </p>
                </div>
                <div style={{ marginTop: "9px", marginLeft: "14px" }}>
                  <Icon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Typography>
  );
}

export default index;
