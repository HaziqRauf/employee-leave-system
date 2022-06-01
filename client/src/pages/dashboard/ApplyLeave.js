import {
  FormRow,
  FormRowSelect,
  Alert,
  CalendarContainer
} from '../../components'
import {useState} from 'react'
import {useAppContext} from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddJob = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    leaveEntitlement,
    session,
    leaveOptions,
    sessionOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
    fromdate,
    todate,
    balance,
    disabledInput,
    reason
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!fromdate || !todate) {
      displayAlert()
      return
    }
    if(isEditing){
      editJob()
      return
    }
    createJob()
  }
  const handleJobInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }
  const handleDate = (e) => {
    const duration = todate - fromdate
    console.log(fromdate)
    console.log(duration)
  }
  return (
    <Wrapper>
      <form className='form'>
        <h3>{ isEditing ? 'edit leave' : 'apply leave' }</h3>
          {showAlert && <Alert />}
          <div className='form-center'>
            {/*leave entitlement*/}
            <FormRowSelect
               name='entitlement'
               value={leaveEntitlement}
               handleChange={handleJobInput}
               list={leaveOptions}
            />
            <FormRow
               name='balance'
               defaultValue={balance}
               value={balance}
               disabledInput={disabledInput}
            />
            <FormRow
               labelText='from'
               type='date'
               name='fromdate'
               value={fromdate}
               handleChange={handleJobInput}
            />
            <FormRow
               labelText='to'
               type='date'
               name='todate'
               value={todate}
               handleChange={handleJobInput}
            />
            <FormRow
               name='day'
               defaultValue={balance}
               value={balance}
               disabledInput={disabledInput}
            />
            {/*session*/}
            <FormRowSelect
               name='session'
               labelText='session'
               value={session}
               handleChange={handleJobInput}
               list={sessionOptions}
            />
            <FormRow
               type='textarea'
               name='reason'
               value={reason}
               handleChange={handleJobInput}
            />
            <div className='btn-container'>
               <button
                 type='submit'
                 className='btn btn-block submit-btn'
                 onClick={handleSubmit}
                 disabled={isLoading}
               >
                 submit
               </button>
               <button
                 className='btn btn-block clear-btn'
                 onClick={(e)=>{
                   e.preventDefault()
                   clearValues()
                 }}
               >
                 clear
               </button>
            </div>
          </div>
      </form>
    </Wrapper>
  )
}
export default AddJob
