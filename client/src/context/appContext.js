import React, {useReducer, useContext} from 'react';
import reducer from './reducer';
import moment from 'moment'
import axios from 'axios'
import {
  DISPLAY_ALERT, 
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  HANDLE_DATE,
  CLEAR_VALUES,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  APPLY_LEAVE_BEGIN,
  APPLY_LEAVE_SUCCESS,
  APPLY_LEAVE_ERROR,
  GET_LEAVES_BEGIN,
  GET_LEAVES_SUCCESS,
  SET_EDIT_LEAVE,
  DELETE_LEAVE_BEGIN,
  EDIT_LEAVE_BEGIN,
  EDIT_LEAVE_SUCCESS,
  EDIT_LEAVE_ERROR,
} from './actions';

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const annualQuota = localStorage.getItem('annualQuota')

const formatDate = 'YYYY-MM-DD'
const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  showSidebar: false,
  isEditing: false,
  editLeaveId: '',
  sessionOptions: ['full day', '1st half day', '2nd half day'],
  session: 'full day',
  leaveOptions: ['annual', 'medical'],
  entitlement: 'annual',
  leaves: [],
  totalLeaves: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest','oldest','a-z','z-a'],
  fromdate: moment().format(formatDate),
  todate: moment().format(formatDate),
  annualQuota: annualQuota || 0,
  countDay: 0,
  disabledInput: true,
  reason: '',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
}

const AppContext = React.createContext()

const AppProvider = ({children}) => {
 const [state, dispatch] = useReducer(reducer, initialState)

  // axios
  const authFetch = axios.create({
    baseURL: '/api/v1',
  })
  // request 
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
         return Promise.reject(error)
    }
  )
  // response
  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.log(error.response)
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )

 const displayAlert = () => {
   dispatch({type: DISPLAY_ALERT})
   clearAlert()
 }
 const clearAlert = () => {
     setTimeout(() => {
       dispatch({
         type: CLEAR_ALERT
       })
     }, 3000)
 }
 const addUserToLocalStorage = ({user,token,annualQuota}) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('annualQuota', annualQuota)
 }

 const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('annualQuota')
 }
    const setupUser = async ({currentUser, endPoint, alertText}) => {
     dispatch({type: SETUP_USER_BEGIN})
     try {
        const {data} = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
         const {user, token} = data
         const annualQuota = user.annualQuota
         dispatch({
           type: SETUP_USER_SUCCESS,
           payload: {user, token, alertText},
         })
        addUserToLocalStorage({user, token, annualQuota})
     }
     catch (error) {
         dispatch({
           type: SETUP_USER_ERROR,
           payload: { msg: error.response.data.msg },
         })
     }
     clearAlert()
    }
    const toggleSidebar = () => {
        dispatch({type: TOGGLE_SIDEBAR})
    }
    const logoutUser = () => {
        dispatch({type: LOGOUT_USER})
        removeUserFromLocalStorage()
    }
    const updateUser = async (currentUser) => {
        dispatch({type: UPDATE_USER_BEGIN})
      try {
        const {data} = await authFetch.patch('auth/updateUser',currentUser)
        const {user, token} = data
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload:{user, token}
        })
        addUserToLocalStorage({user, token})
      } catch (error) {
        if(error.response.status !== 401) {
          dispatch({
            type: UPDATE_USER_ERROR,
            payload: {msg : error.response.data.msg}
          })
        }
      }
      clearAlert()
    }
    const handleChange = ({name, value}) => {
      dispatch({ type: HANDLE_CHANGE, payload: {name, value} })
    }
    const handleDate = ({day}) => {
      dispatch({ type: HANDLE_DATE, payload: {day} })
    }
    const clearValues = () => {
      dispatch({ type: CLEAR_VALUES })
    }
    const applyLeave = async () => {
      dispatch({ type: APPLY_LEAVE_BEGIN })
      try {
        const {entitlement, fromdate, todate, countDay, session, reason} = state
        await authFetch.post('/leaves', {
          entitlement,
          fromdate,
          todate,
          countDay,
          session,
          reason,
        })
        dispatch({ type: APPLY_LEAVE_SUCCESS })
        dispatch({ type: CLEAR_VALUES })
      } catch (error) {
        if(error.response.status === 401) return
          dispatch({
            type: APPLY_LEAVE_ERROR,
            payload: { msg: error.response.data.msg }
          })
      }
      clearAlert()
    }
    const getLeaves = async () => {
      const { page, search, searchStatus, searchType, sort } = state
     
      let url = `/leaves?page=${page}&leaveType=${searchStatus}&session=${searchType}&sort=${sort}`
      // let url = `leaves`
      if(search) {
        url = url + `&search=${search}`
      }

      dispatch({ type: GET_LEAVES_BEGIN })
      try {
        const { data } = await authFetch(url)
        const { leaves, totalLeaves, numOfPages } = data
        // console.log(leaves)
        dispatch({
          type: GET_LEAVES_SUCCESS,
          payload: {
            leaves,
            totalLeaves,
            numOfPages,
          }
        })
      } catch(error) {
        console.log(error)
        // logoutUser()
      }
      clearAlert()
    }
    const setEditLeave = (id) => {
      dispatch({ type: SET_EDIT_LEAVE, payload: { id } })
    }
    const editLeave = async () => {
      dispatch({ type: EDIT_LEAVE_BEGIN })
      try {
        const { session, entitlement, fromdate, todate, countDay, status } = state
        await authFetch.patch(`/leaves/${state.editLeaveId}`, {
          session,
          entitlement,
          fromdate,
          todate,
          countDay,
          status,
        })
        dispatch({ type: EDIT_LEAVE_SUCCESS })
        dispatch({ type: CLEAR_VALUES })
      } catch(error) {
        if(error.response.status === 401) return
        dispatch({
          type: EDIT_LEAVE_ERROR,
          payload: { msg: error.response.data.msg },
        })
      }
      clearAlert()
    }
    const deleteLeave = async (jobId) => {
      dispatch({ type: DELETE_LEAVE_BEGIN })
      try {
        await authFetch.delete(`/leaves/${jobId}`)
        getLeaves()
      } catch(error) {
        logoutUser()
      }
    }
    const showStats = async () => {
      dispatch({ type: SHOW_STATS_BEGIN})
      try {
        const { data } = await authFetch('/leaves/stats')
        dispatch({
          type: SHOW_STATS_SUCCESS,
          payload: {
            stats: data.defaultStats,
            monthlyApplications: data.monthlyApplications,
          }
        })
      } catch (error) {
        logoutUser()
      }
      clearAlert()
    }
    const clearFilters = () => {
      dispatch({ type: CLEAR_FILTERS })
    }
    const changePage = (page) => {
      dispatch({ type: CHANGE_PAGE, payload: { page }})
    }
    return (
      <AppContext.Provider
        value={{
          ...state,
          displayAlert,
          setupUser,
          toggleSidebar,
          logoutUser,
          updateUser,
          handleChange,
          handleDate,
          clearValues,
          applyLeave,
          getLeaves,
          setEditLeave,
          deleteLeave,
          editLeave,
          showStats,
          clearFilters,
          changePage
        }}>
        {children}
      </AppContext.Provider>
    )
}

const useAppContext = () => {
  return useContext(AppContext)
}
export {AppProvider, formatDate, initialState, useAppContext}
