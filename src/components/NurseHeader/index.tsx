import Typography from 'components/Typography'
import styles from './index.module.scss'
import { BackArrow, LogoutIcon } from 'components/Icons'
import Swal from 'sweetalert2';

function index({
  router,
}: any) {

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
      <div className={`default-container1`}  >
      <div className={styles.icon_container}>
        <div onClick={goBack}>
          <BackArrow />
        </div>
        <div onClick={logout}>
          <LogoutIcon />
        </div>
      </div>
       
      </div>
    </Typography>
  )
}

export default index