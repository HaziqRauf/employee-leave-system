import Wrapper from '../assets/wrappers/JobInfo'
const LeaveInfo = ({ icon, text }) => {
    return (
      <Wrapper>
        <span className='icon'>{icon}</span>
        <span className='text'>{text}</span>
      </Wrapper>
    )
}
export default LeaveInfo
