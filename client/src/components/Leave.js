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
  countDay,
  createdAt,
  createdBy,
  annualQuota,
  status
}) => {
  const { setEditLeave, deleteLeave, allUser, user } = useAppContext()
  const formatDate = 'DD MMM YYYY'
  let date = moment(createdAt)
  date = date.format(formatDate)
  fromdate = moment(fromdate).format(formatDate)
  todate = moment(todate).format(formatDate)
  const range = `${fromdate} - ${todate}`
  const alu = allUser.filter((k)=> k._id === createdBy)
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{countDay}</div>
        <div className='info'>
          <h5>{session}</h5>
          <p>{entitlement} leave</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <LeaveInfo icon={<FaLocationArrow />} text={range}/>
          <LeaveInfo icon={<FaCalendarAlt />} text={date} />
            <LeaveInfo icon={<FaBriefcase />} text={alu[0].name} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
         {user.role ==='admin' && 
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
         }
        </footer>
      </div>
    </Wrapper>
  )
}
export default Leave
