import Typography from 'components/Typography'
import { MoreIcon } from 'components/Icons'

interface Iprops {
  data: object[];
  router: any;
}

function index({ data = [], router }: Iprops) {

  const handleClick = (e: any, item: any) => {
    e.preventDefault();
    router.push(`/patient/patient-details/${item._id}`)
  }

  return (
    <Typography>
      <div className="row mt-5 " style={{ minHeight: "540px" }}>
        <div className="col-sm-12">
          <div className="card-plain table-plain-bg">
            <div className="card-body table-full-width table-responsive">
              <table className="text-center table table-hover align-items-center">
                <thead>
                  <tr><th>ID</th>
                    <th>Patient Name</th>
                    <th>Admission Date</th>
                    <th>Discharge Date</th>
                    <th >Actions</th>
                  </tr></thead>
                <tbody>
                  {data.map((item: any) => (
                    <tr className="cursor-pointer" onClick={(e: any) => handleClick(e, item)}>
                      <td>1</td>
                      <td>{`${item.fName} ${item.lName}`}</td>
                      <td>{item.dayIn}</td>
                      <td>{item.dayOut || `-`}</td>
                      <td ><MoreIcon /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Typography>
  )
}

export default index
