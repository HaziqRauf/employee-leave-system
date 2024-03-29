import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Leave from './Leave'
import Wrapper from '../assets/wrappers/JobsContainer'
import PageBtnContainer from './PageBtnContainer'

const LeavesContainer = () => {
  const {
    getLeaves,
    leaves,
    isLoading,
    page,
    totalLeaves,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages
  } = useAppContext()
  useEffect(()=> {
    getLeaves()
      // eslint-disable-next-line
  }, [ page, search, searchStatus, searchType, sort ])
  
  if (isLoading) {
    return <Loading center />
  }
  if (leaves.length === 0) {
    return <Wrapper>
        <h2>No Leaves to display </h2>
    </Wrapper>
  }
  return (
    <Wrapper>
      <h5>
        {totalLeaves} leave{leaves.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {leaves.map((leave)=>{
          return <Leave key={leave._id} {...leave} />
        })}
      </div>
        { numOfPages > 1 && <PageBtnContainer /> }
    </Wrapper>
  )
}

export default LeavesContainer
