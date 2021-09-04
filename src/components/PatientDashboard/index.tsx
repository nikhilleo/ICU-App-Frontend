import Typography from 'components/Typography'
import styles from './index.module.scss'
import { BackArrow, LogoutIcon, TelescopeIcon } from 'components/Icons'
import { SyringeIcon } from 'components/Icons'
import { HeartIcon1 } from 'components/Icons'
import Swal from 'sweetalert2'

function index({ router, loader }: any) {
  const goBack = () => {
    router.back();
  }

  const logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You're about to signed out!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, sign out!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        router.replace("/")
        Swal.fire(
          'Signed Out!',
        )
      } 
    })
  }

  return (
    <Typography>
      <div className={`${styles.main} `}>
      <div className={styles.icon_container}>
        <div onClick={goBack}>
          <BackArrow />
        </div>
        <div onClick={logout}>
          <LogoutIcon />
        </div>
      </div>
        <div className="col d-flex hide-scroll overflow-auto">
          <img className={`${styles.Img}`} src="../Images/Doctor1.svg" alt="" />
          <div>
            <div className={`${styles.container}  `}>
              <div className={`${styles.Doctor} `}>
                <div>
                  <p
                    className="d-flex fs-20 lh-9 Roboto"
                    style={{
                      color: "#8288AC",
                      fontSize: "25px",
                      marginTop: "5px",
                      marginLeft: "30px",
                    }}
                  >
                    Doctor
                  </p>
                  <p
                    className="  d-flex fs-20 lh-9 Roboto"
                    style={{
                      color: "#BCBDC3",
                      marginLeft: "47px",
                      marginTop: "-26px",
                    }}
                  >
                    64
                  </p>
                </div>
                <div style={{ marginTop: "9px", marginLeft: "14px" }}>
                  <TelescopeIcon />
                </div>
              </div>
              <div className={`${styles.Nurse} `}>
                <div>
                  <p
                    className="ml-4 d-flex fs-20 lh-9 Roboto"
                    style={{
                      color: "#8288AC",
                      fontSize: "25px",
                      marginTop: "5px",
                      marginLeft: "30px",
                    }}
                  >
                    Nurse
                  </p>
                  <p
                    className="  d-flex fs-20 lh-9 Roboto"
                    style={{
                      color: "#BCBDC3",
                      marginLeft: "47px",
                      marginTop: "-26px",
                    }}
                  >
                    64
                  </p>
                </div>
                <div style={{ marginTop: "7px", marginLeft: "14px" }}>
                  <SyringeIcon />
                </div>
              </div>
              <div className={`${styles.Patient} `}>
                <div>
                  <p
                    className="ml-4 d-flex fs-20 lh-9 Roboto"
                    style={{
                      color: "#8288AC",
                      fontSize: "25px",
                      marginTop: "5px",
                      marginLeft: "30px",
                    }}
                  >
                    Patient
                  </p>
                  <p
                    className="  d-flex fs-20 lh-9 Roboto"
                    style={{
                      color: "#BCBDC3",
                      marginLeft: "47px",
                      marginTop: "-26px",
                    }}
                  >
                    64
                  </p>
                </div>
                <div style={{ marginTop: "15px", marginLeft: "14px" }}>
                  <HeartIcon1 />
                </div>
              </div>
            </div>
            <div className={`${styles.info}`}>
              <h1>Admin</h1>
              <h1>Dashboard</h1>
            </div>
          </div>
          <img className={`${styles.Img}`} src="../Images/Doctor2.svg" alt="" />
        </div>
      </div>
    </Typography>
  )
}

export default index