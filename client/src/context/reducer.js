import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR ,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
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

import {initialState} from './appContext'

const reducer = (state, action) => {
 if(action.type === DISPLAY_ALERT){
     return {...state,
       showAlert: true,
       alertType: 'danger',
       alertText: 'Please provide all values!'
     }
 }
 if(action.type === CLEAR_ALERT){
     return {...state,
       showAlert: false,
       alertType: '',
       alertText: ''
     }
 }
 if(action.type === SETUP_USER_BEGIN){
     return {...state,
       isLoading: true,
     }
 }
 if(action.type === SETUP_USER_SUCCESS){
     return {...state,
       isLoading: false,
       token: action.payload.token,
       user: action.payload.user,
       userLocation: action.payload.location,
       jobLocation: action.payload.location,
       showAlert: true,
       alertType: 'success',
       alertText: action.payload.alertText,
     }
 }
 if(action.type === SETUP_USER_ERROR){
     return {...state,
       isLoading: false,
       showAlert: true,
       alertType: 'danger',
       alertText: action.payload.msg,
     }
 }
 if(action.type === TOGGLE_SIDEBAR){
     return {...state,
       showSidebar: !state.showSidebar,
     }
 }
 if(action.type === LOGOUT_USER){
     return {...initialState,
       user: null,
       token: null,
       userLocation: '',
       jobLocation: '',
     }
 }
 if(action.type === UPDATE_USER_BEGIN){
     return {...state,
       isLoading: true,
     }
 }
 if(action.type === UPDATE_USER_SUCCESS){
     return {...state,
       isLoading: false,
       token: action.payload.token,
       user: action.payload.user,
       userLocation: action.payload.location,
       jobLocation: action.payload.location,
       showAlert: true,
       alertType: 'success',
       alertText: 'User Profile Updated!',
     }
 }
 if(action.type === UPDATE_USER_ERROR){
     return {...state,
       isLoading: false,
       showAlert: true,
       alertType: 'danger',
       alertText: action.payload.msg,
     }
 }
 if(action.type === HANDLE_CHANGE){
     return {
       ...state,
       page: 1,
       [action.payload.name]: action.payload.value,
     }
 }
 if(action.type === CLEAR_VALUES){
     const initialState = {
       isEditing: false,
       editJobId: '',
       editLeaveId: '',
       position: '',
       company: '',
       jobLocation: state.userLocation || '',
       jobType: 'full-time',
       status: 'pending',
     }
     return {...state, ...initialState}
 }
 if(action.type === CREATE_JOB_BEGIN){
     return {...state,
       isLoading: true,
     }
 }
 if(action.type === CREATE_JOB_SUCCESS){
     return {...state,
       isLoading: false,
       showAlert: true,
       alertType: 'success',
       alertText: 'New Job Created!',
     }
 }
 if(action.type === CREATE_JOB_ERROR){
     return {...state,
       isLoading: false,
       showAlert: true,
       alertType: 'danger',
       alertText: action.payload.msg,
     }
 }
 if(action.type === APPLY_LEAVE_BEGIN){
     return {
       ...state,
       isLoading: true,
     }
 }
 if(action.type === APPLY_LEAVE_SUCCESS){
     return {
       ...state,
       isLoading: false,
       showAlert: true,
       alertType: 'success',
       alertText: 'New leave has been applied!',
     }
 }
 if(action.type === APPLY_LEAVE_ERROR){
     return {
       ...state,
       isLoading: false,
       showAlert: true,
       alertType: 'danger',
       alertText: action.payload.msg,
     }
 }
 if(action.type === GET_JOBS_BEGIN){
     return {...state,
       isLoading: true,
       showAlert: false
     }
 }
 if(action.type === GET_JOBS_SUCCESS){
     return {...state,
       isLoading: false,
       jobs: action.payload.jobs,
       totalJobs: action.payload.totalJobs,
       numOfPages: action.payload.numOfPages,
     }
 }
 if(action.type === GET_LEAVES_BEGIN){
     return {...state,
       isLoading: true,
       showAlert: false
     }
 }
 if(action.type === GET_LEAVES_SUCCESS){
     return {...state,
       isLoading: false,
       leaves: action.payload.leaves,
       totalLeaves: action.payload.totalLeaves,
       numOfPages: action.payload.numOfPages,
     }
 }
 if(action.type === SET_EDIT_LEAVE) {
   const leave = state.leaves.find((leave)=> leave._id === action.payload.id)
   const {_id, session, leaveEntitlement, fromdate, todate, annualQuota, status} = leave
   return {
     ...state,
     isEditing: true,
     editLeaveId: _id,
     session,
     leaveEntitlement,
     fromdate,
     todate,
     annualQuota,
     status,
   }
 }
 if(action.type === DELETE_LEAVE_BEGIN){
   return { ...state, isLoading: true }
 }
 if(action.type === EDIT_LEAVE_BEGIN){
     return { ...state, isLoading: true }
 }
 if(action.type === EDIT_LEAVE_SUCCESS){
     return {...state,
       isLoading: false,
       showAlert: true,
       alertType: 'success',
       alertText: 'Leave Updated!',
     }
 }
 if(action.type === EDIT_LEAVE_ERROR){
     return {...state,
       isLoading: false,
       showAlert: true,
       alertType: 'danger',
       alertText: action.payload.msg,
     }
 }
 if(action.type === SET_EDIT_JOB) {
   const job = state.jobs.find((job)=> job._id === action.payload.id)
   const {_id, position, company, jobLocation, jobType, status} = job
   return {
     ...state,
     isEditing: true,
     editJobId: _id,
     position,
     company,
     jobLocation,
     jobType,
     status,
   }
 }
 if(action.type === DELETE_JOB_BEGIN){
   return { ...state, isLoading: true }
 }
 if(action.type === EDIT_JOB_BEGIN){
     return { ...state, isLoading: true }
 }
 if(action.type === EDIT_JOB_SUCCESS){
     return {...state,
       isLoading: false,
       showAlert: true,
       alertType: 'success',
       alertText: 'Job Updated!',
     }
 }
 if(action.type === EDIT_JOB_ERROR){
     return {...state,
       isLoading: false,
       showAlert: true,
       alertType: 'danger',
       alertText: action.payload.msg,
     }
 }
 if(action.type === SHOW_STATS_BEGIN){
   return {
     ...state,
     isLoading: true,
     showAlert: false,
   }
 }
 if(action.type === SHOW_STATS_SUCCESS){
   return {
     ...state,
     isLoading: false,
     stats: action.payload.stats,
     monthlyApplications: action.payload.monthlyApplications,
   }
 }
 if(action.type === CLEAR_FILTERS) {
   return {
     ...state,
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
   }
 }
 if(action.type === CHANGE_PAGE){
   return { ...state, page: action.payload.page }
 }
  throw new Error(`no such action: ${action.type}`)
}

export default reducer
