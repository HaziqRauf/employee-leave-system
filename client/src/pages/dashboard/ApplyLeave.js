import {
  FormRow,
  FormRowSelect,
  Alert,
} from '../../components'
import moment from 'moment'
import {useEffect, useRef} from 'react'
import {useAppContext} from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const ApplyLeave = () => {
  let period = useRef(0)
  let day = 0
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    entitlement,
    session,
    leaveOptions,
    sessionOptions,
    status,
    statusOptions,
    handleChange,
    handleDate,
    clearValues,
    createJob,
    editJob,
    editLeave,
    fromdate,
    todate,
    balance,
    countDay,
    disabledInput,
    reason,
    applyLeave
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!fromdate || !todate) {
      displayAlert()
      return
    }
    if(isEditing){
      editLeave()
      return
    }
    applyLeave()
  }
  const handleJobInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }
  const handleDateInput = (e) => {
    const y = moment(todate)
    const x = moment(fromdate)
    period.current = moment.duration(y.diff(x)).as('days')
    day = period.current
    handleDate({day})
    // countDay = period.current
  }
  useEffect(() => {
    period.current = countDay
    handleDateInput()
  },[todate, fromdate])
  return (
    <Wrapper>
      <form className='form'>
        <h3>{ isEditing ? 'edit leave' : 'apply leave' }</h3>
          {showAlert && <Alert />}
          <div className='form-center'>
            {/*leave entitlement*/}
            <FormRowSelect
               name='entitlement'
               value={entitlement}
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
               name='fromdate'
               labelText='from'
               type='date'
               value={fromdate}
               handleChange={handleJobInput}
            />
            <FormRow
               name='todate'
               labelText='to'
               type='date'
               value={todate}
               handleChange={handleJobInput}
            />
            <FormRow
               name='period.current'
               labelText='day'
               value={period.current}
               handleChange={handleDateInput}
                /*onBlur={handleDateInput()}*/
               disabledInput={disabledInput}
            />
            {/*session*/}
            <FormRowSelect
               name='session'
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
export default ApplyLeave
