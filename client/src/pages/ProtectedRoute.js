import {useAppContext} from '../context/appContext'
import {Navigate} from 'react-router-dom'
import {Alert} from '../components'

const ProtectedRoute = ({
  children,
  roles,
}: {
  children: JSX.Element;
  roles: Array<Role>;
}) => {
  const {user, showAlert} = useAppContext()
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
