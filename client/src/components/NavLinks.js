import links from '../utils/links'
import {NavLink} from 'react-router-dom'
import {useAppContext} from '../context/appContext'

const NavLinks = ({toggleSidebar}) => {
  const {user} = useAppContext()
  return (
    <div className="nav-links">
      {links
        .filter((link) => link.roles.includes(user.role))
        .map((link)=> {
        const {text, path, icon, id} = link
        return (
          <NavLink 
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={({isActive})=> isActive ? 'nav-link active' : 'nav-link'}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
}
export default NavLinks
