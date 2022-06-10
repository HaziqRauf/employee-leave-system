import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import {
  StatsContainer,
  Loading,
  ChartsContainer,
} from '../../components'

const Stats = () => {
  const { showStats, isLoading, monthlyApplications, user } = useAppContext()
  useEffect(()=> {
    showStats()
      // eslint-disable-next-line
  }, [])
  if(isLoading) {
    return <Loading center />
  }
  return (
    <>
      <StatsContainer />
       { user.role === 'admin' && monthlyApplications.length > 0 && <ChartsContainer /> }
    </>
  )
}
export default Stats
