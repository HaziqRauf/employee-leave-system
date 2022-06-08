import {LeavesContainer, SearchContainer } from '../../components'
import {useAppContext} from '../../context/appContext'

const AllLeaves = () => {
  const {user} = useAppContext()
  return <>
      {user.role ==='admin' && <SearchContainer />}
       <LeavesContainer />
    </>
}

export default AllLeaves
