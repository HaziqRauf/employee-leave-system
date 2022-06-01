import moment from 'moment'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Job'
import LeaveInfo from './LeaveInfo'

const Leave = ({
  _id,
  entitlement,
  session,
  fromdate,
  todate,
  createdAt,
  annualQuota,
  status
}) => {
  const { setEditLeave, deleteLeave } = useAppContext()
  const format = 'DD MM YYYY'
  let date = moment(createdAt)
  date = date.format(format)
  fromdate = moment(fromdate).format(format)
  todate = moment(todate).format(format)
  const range = `${fromdate} - ${todate}`
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>J</div>
        <div className='info'>
          <h5>{session}</h5>
          <p>{entitlement} leave</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <LeaveInfo icon={<FaLocationArrow />} text={range}/>
          <LeaveInfo icon={<FaCalendarAlt />} text={date} />
            {/*<LeaveInfo icon={<FaBriefcase />} text="hai" /> */}
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/apply-leave'
              className='btn edit-btn'
              onClick={()=> setEditLeave(_id)}
            >
                Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={()=> deleteLeave(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}
export default Leave
