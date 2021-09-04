import Typography from "components/Typography";
import styles from "./index.module.scss";

function index({Icon, title, count}: any) {
  return (
    <Typography>
      <div className={`${styles.mainList}   `}>
        <div className="col d-flex hide-scroll justify-content-between p-0">
          <div>
            <div className={`${styles.container2} mr-3 pl-1`}>
              <div className={`${styles.List2}`}>
                <div
                  style={{ minWidth: "50%" }}
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <p
                    className="d-flex fs-20 lh-9 Roboto"
                    style={{
                      color: "#8288AC",
                      fontSize: "15px",
                      marginBottom: "0px",
                      textAlign: "center",
                    }}
                  >
                    {title}
                  </p>
                  <p
                    className="  d-flex fs-17 lh-9 Roboto"
                    style={{
                      color: "#BCBDC3",
                      marginBottom: "0px",

                    }}
                  >
                    {count}
                  </p>
                </div>
                <div className={styles.icon_container}>
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
