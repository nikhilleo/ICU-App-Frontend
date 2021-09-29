import Typography from 'components/Typography'
import styles from './index.module.scss'
import { ListIcon, TubeIcon, TrachestomyIcon, CutIcon, BedIcon, VentilatorIcon, ManWithMaskIcon } from "components/Icons"
import PatientDetailsList from 'components/PatientDetailsList'
import Button from 'components/Button'
import { useEffect, useState } from 'react'
import axios from '../../../axios'
import { getLocalStorageItem } from 'utils/helper'
import Loader from 'components/Loader'
import DashboardWrapper from 'components/DashboardWrapper'
import Swal from 'sweetalert2'

function Index({ router }: any) {
  const [data, setData]: any = useState();

  useEffect(() => {
    const token = getLocalStorageItem("token")
    axios.get(`/patient/getPatient/${router.query.id}`, {
      headers: { Authorization: token },
    })
      .then((res: any) => {
        if (res.data.success) setData(res.data.patient)
      })
      .catch((err: any) => {
      })
  }, [router.query.id])

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

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(`/patient/select-slot/${router.query.id}`)
  }
  
  if (!data) return (
    <Loader />
  )

  return (
    <Typography>
      <div className="default-container  ">
        <div className="mb-3 w-100">
          <DashboardWrapper goBack={goBack} logout={logout}>
            <div className="w-100 justify-content-center row no-gutters align-items-center mt-4">
              <div style={{ maxWidth: "110px" }}>
                <img className="card-img " src={data.patinet_image ? data.patinet_image : "/Images/doctor.png"} alt="Patient Image" />
              </div>
              <div className="mt-3 ml-5">
                <p className="ml-4 d-flex   fs-20 lh-20">Patient Id :- {data._id}</p>
                <p className="ml-4 d-flex  fs-20 lh-20">Patient Name :- {`${data.fName} ${data.lName}`}</p>
                <p className="ml-4 d-flex  fs-20 lh-20">Age :- {data.age}</p>
                <p className="ml-4 d-flex  fs-20 lh-20">Sex :- {data.gender}</p>
              </div>
            </div>
          </DashboardWrapper>
        </div>
        <div className={`${styles.Main} mt-2 d-flex hide-scroll `}>
          <div>
            <h5 style={{ color: "#8288AC" }}>
              DIAGNOSIS  LIST
            </h5>
          </div>
          <div className="ml-5">
            <ListIcon />
          </div>
          <div className={`overflow-auto ml-5 hide-scroll`}>
            <ul className="ul blue">
              {data.diagnosisList.map((item: any) => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className={`${styles.List} hide-scroll `}>
          <div>
            <PatientDetailsList title="TUBE SIZE" Icon={TubeIcon} count={data.tubeSize} />
            <PatientDetailsList title="CUT / TIED" Icon={CutIcon} count={data.cutOrTied} />
          </div>
          <div>
            <PatientDetailsList title="DAYS ICU STAY" Icon={BedIcon} count={data.ETT_TRACHESTOMY} />
            <PatientDetailsList title="DAY INTUBETED" Icon={ManWithMaskIcon} count={data.daysIntubed} />
          </div>
          <div>
            <PatientDetailsList title="DAYS VENTILATED" Icon={VentilatorIcon} count={data.daysVentilated} />
            <PatientDetailsList title="E.TT. /TRACHESTOMY" Icon={TrachestomyIcon} count={data.daysICUstay} />
          </div>
        </div>
        <div style={{ width: "87%" }}>
          <div className={`${styles.main}   `}>
            <div className=" col d-flex justify-content-md-center hide-scroll overflow-auto">
              <div className="mr-5">
                <div className={`${styles.info}`}>
                  <h2 className="fs-20">Day In</h2>
                </div>
                <div className={`${styles.container}  `}>
                  <div className={`${styles.Doctor} `}>
                    <div>
                      <h3 style={{ marginTop: "5px ", color: "#5C5D64" }}>{data.dayIn.split(" ")[0] || "-"}</h3>
                    </div>
                    <div style={{ marginTop: "9px", marginLeft: "14px" }}>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className={`${styles.info}`}>
                  <h2 className="fs-20">Day Out</h2>
                </div>
                <div className={`${styles.container}  `}>
                  <div className={`${styles.Doctor} `}>
                    <div>
                      <h3 style={{ marginTop: "5px ", color: "#5C5D64" }}>{data.dayOut || "-"}</h3>
                    </div>
                    <div style={{ marginTop: "9px", marginLeft: "14px" }}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-75 my-5 pb-4">
          <Button
            props={{
              type: "submit"
            }}
            onClick={handleClick}
          >
            Open Report Details
          </Button>
        </div>
      </div>
    </Typography>
  )
}

export default Index
