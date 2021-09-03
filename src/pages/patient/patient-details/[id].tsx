import Typography from 'components/Typography'
import styles from './index.module.scss'
import PatientDetails from 'components/PatientDetails'
import { ListIcon, TrachestomyIcon, TubeIcon, CutIcon, BedIcon, VentilatorIcon, ManWithMaskIcon} from "components/Icons"
import PatientDetailsList from 'components/PatientDetailsList'
import Button from 'components/Button'
import { useEffect, useState } from 'react'
import axios from '../../../axios'
import { getLocalStorageItem } from 'utils/helper'
import Loader from 'components/Loader'

function Index(props: any) {
  const [data, setData]: any = useState();
  useEffect(()=>{
    const token = getLocalStorageItem("token")
    axios.get(`/patient/getPatient/${props.router.query.id}`, {
      headers: { Authorization: token, role: "admin" },
    })
      .then((res: any) => {
        console.log(res)
        if(res.data.success) setData(res.data.patient)
      })
      .catch((err: any) => {
        console.log(err.response)
      })
  }, [props.router.query.id])

  if(!data) return(
    <Loader />
  )
  return (
    <Typography>
      <div className="default-container  ">
        <div className="mb-3 w-100">
          <PatientDetails 
            id={data._id}
            name={`${data.fName} ${data.lName}`}
            age={data.age}
            gender={data.gender}
            src={data.patinet_image}
          />
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
          <div className={`${styles.nn} ml-5 hide-scroll`}>
            <ul className="ul blue">
              {data.diagnosisList.map((item:any)=>(
                <li>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className={`${styles.List} hide-scroll `}>
          <div >
            <PatientDetailsList title="TUBE SIZE" Icon={TubeIcon} count={data.tubeSize} />
            <PatientDetailsList title="E.TT" Icon={TrachestomyIcon} count={data.daysICUstay} />
          </div>
          <div>
            <PatientDetailsList title="CUT / TIED" Icon={CutIcon} count={data.cutOrTied} />
            <PatientDetailsList title="DAYS ICU STAY" Icon={BedIcon} count={data.ETT_TRACHESTOMY} />
          </div>
          <div>
            <PatientDetailsList title="DAYS VENTILATED" Icon={VentilatorIcon} count={data.daysVentilated} />
            <PatientDetailsList title="DAY INTUBETED" Icon={ManWithMaskIcon} count={data.daysIntubed} />
          </div>
        </div>
        <div>
          <div className={`${styles.main}   `}>
            <div className=" col d-flex hide-scroll overflow-auto">
              <div className="mr-5">
                <div className={`${styles.info}`}>
                  <h2 className="fs-20">Day In</h2>
                </div>
                <div className={`${styles.container}  `}>
                  <div className={`${styles.Doctor} `}>
                    <div>
                      <h3 style={{ marginTop: "5px " ,color:"#5C5D64" }}>01/11/2021</h3>
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
                      <h3 style={{ marginTop: "5px " ,color:"#5C5D64" }}>01/11/2021</h3>
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
          >
            Open Report Details
          </Button>
        </div>
      </div>
    </Typography>
  )
}

export default Index