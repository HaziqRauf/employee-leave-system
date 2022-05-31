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
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
    fromdate,
    todate
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!position || !company || !jobLocation) {
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
  return (
    <Wrapper>
      <form className='form'>
        <h3>{ isEditing ? 'edit job' : 'apply leave' }</h3>
          {showAlert && <Alert />}
          <div className='form-center'>
            <FormRow
               type='text'
               name='position'
               value={position}
               handleChange={handleJobInput}
            />
            <FormRow
               type='date'
               name='from'
               value={fromdate}
               handleChange={handleJobInput}
               onClick={()=> !modalIsOpen}
            />
            <FormRow
               type='date'
               name='to'
               value={todate}
               handleChange={handleJobInput}
            />
            <FormRow
               type='text'
               labelText='job location'
               name='jobLocation'
               value={jobLocation}
               handleChange={handleJobInput}
            />
            {/*leave entitlement*/}
            <FormRowSelect
               name='entitlement'
               value={status}
               handleChange={handleJobInput}
               list={statusOptions}
            />
            {/*session*/}
            <FormRowSelect
               name='jobType'
               labelText='session'
               value={jobType}
               handleChange={handleJobInput}
               list={jobTypeOptions}
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
