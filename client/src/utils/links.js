import {IoBarChartSharp} from 'react-icons/io5'
import {MdQueryStats} from 'react-icons/md'
import {FaWpforms} from 'react-icons/fa'
import {ImProfile} from 'react-icons/im'

const links = [
  {
    id: 1,
    text: 'stats',
    path: '/',
    icon: <IoBarChartSharp />,
    roles: ['admin']
  },
  {
    id: 2,
    text: 'all leaves',
    path: 'all-leaves',
    icon: <MdQueryStats />,
    roles: ['admin']
  },
  {
    id: 3,
    text: 'apply leave',
    path: 'apply-leave',
    icon: <FaWpforms />,
    roles: ['admin', 'user']
  },
  {
    id: 4,
    text: 'profile',
    path: 'profile',
    icon: <ImProfile />,
    roles: ['admin', 'user']
  },
]
export default links
