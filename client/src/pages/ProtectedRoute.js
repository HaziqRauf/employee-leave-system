import {useAppContext} from '../context/appContext'
import {Navigate} from 'react-router-dom'
import {ROLE} from '../context/roles.ts'
import Error from './Error'

const ProtectedRoute = ({
  children,
  roles,
}: {
  children: JSX.Element;
  roles: Array<Role>;
}) => {
  const {user} = useAppContext()
  const userHasRequiredRole = user && roles.includes(user.role) ? true: false
  if (!user) {
    return <Navigate to='/landing' />
  }
  if (user && !userHasRequiredRole) {
      return <h4>User Don't Have Access</h4>
  }
  return children
}

export default ProtectedRoute
