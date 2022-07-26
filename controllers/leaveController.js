import moment from 'moment'
import mongoose from 'mongoose'
import User from '../models/User.js'
import Leave from '../models/Leave.js'
import {StatusCodes} from 'http-status-codes'
import {BadRequestError, NotFoundError, UnAuthenticatedError} from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'

const applyLeave = async (req, res) => {
  const {fromdate, todate, countDay} = req.body
  if(!fromdate|| !todate) {
    throw new BadRequestError('Please provide all values')
  }
  if(countDay < 0) {
    throw new BadRequestError('To date must be later than From date')
  }
  req.body.createdBy = req.user.userId
  const leave = await Leave.create(req.body)
  const user = await User.findOne({ _id: req.user.userId })
  let leavArr = user.leaves
  leavArr.push(leave)
  const pushLeave = await User.findOneAndUpdate({_id: req.user.userId},{leaves: leavArr})
  res.status(StatusCodes.CREATED).json({ leave, pushLeave })
}

const getAllLeaves = async (req, res) => {
  const { session, leaveType, sort, search} = req.query
  let queryObject = {}
  if(req.user.role === 'user') {
    queryObject = {
      createdBy: req.user.userId,
    }
  }
  // add stuff based on conditions
  if(session && session !== 'all') { //checking if status is valid
  // if(status !== 'all'){
    queryObject.session = session
  }
  if(leaveType && leaveType !== 'all'){
    queryObject.entitlement = leaveType
  }
  let result = ''
  let query = ''
  if(search){
    // queryObject.name = { $regex: search, $options: 'i' }
    result = await Leave.aggregate([
     { $lookup:
        {
          from: 'user',
          localField: '_id',
          foreignField: 'leaves',
          as: 'user_leave'
        }
     }
  ])
  }

  // NO AWAIT
  result = Leave.find(queryObject)
  
  console.log(result)
  // console.log(result)
    /*
  let result = User.aggregate([
      { $match: { name: passName} },
  ])

       {
        from: 'user',
        pipeline: [{$match: 
          {$and: [
            { $regex: search, $options: 'i' },
            {
              $expr: {
                $eq: [
                  '$createdBy','$_id'
                ],
              }
            },
          ]}
        }],
        as: 'userLeave'
       }
  }*/

  //Chain sort conditions
  if (sort === 'latest') {
    result = result.sort('-createdAt')
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt')
  }
  if (sort === 'a-z') {
    result = result.sort('status')
  }
  if (sort === 'z-a') {
    result = result.sort('-status')
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)
  const leaves = await result

  const totalLeaves = await Leave.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalLeaves/limit)
  res
    .status(StatusCodes.OK)
    .json({leaves, totalLeaves: totalLeaves, numOfPages: numOfPages})
}

const updateLeave = async (req, res) => {
  const { id: leaveId } = req.params
  const { fromdate, todate, countDay, annualQuota } = req.body
  if(!fromdate || !todate) {
    throw new BadRequestError('Please provide all values')
  }
  if(countDay < 0) {
    throw new BadRequestError('To date must be later than From date')
  }
  if(annualQuota <= 0) {
    throw new BadRequestError('Annual Quota exceed')
  }
  const leave = await Leave.findOne({ _id: leaveId })
  if(!leave) {
    throw new NotFoundError(`No job with id:${id}`)
  }
  const updatedLeave = await Leave.findOneAndUpdate({ _id:leaveId },req.body, {
    new: true,
    runValidators: true,
  })
  // check permissions
  // checkPermissions(req.user, leave.createdBy)
  res.status(StatusCodes.OK).json({ updatedLeave })
}

const deleteLeave = async (req, res) => {
  console.log(req.query)
  const { id: leaveId } = req.params
  const leave = await Leave.findOne({ _id: leaveId })
  console.log(req.leave)

  let leavArr = req.user.leaves
  // leavArr.pop(leave)
  const pushLeave = await User.findOneAndUpdate({_id: req.user.userId},{leaves: leavArr})
  if(!leave) {
    throw new NotFoundError(`No job with id:${id}`)
  }
  // checkPermissions(req.user, leave.createdBy)

  // await leave.remove()
  res.status(StatusCodes.OK).json({ pushLeave, msg: 'Success! Leave deleted' })
}

const showStats = async (req, res) => {
  let stats = await Leave.aggregate([
        { $match: {} },
        { $group: { _id: '$status', count: { $sum: 1 } } },
  ])
  if(req.user.role === 'user') {
    stats = await Leave.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
    ])
  }
  
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})

  const defaultStats = {
    pending: stats.pending || 0,
    approved: stats.approved || 0,
    declined: stats.declined || 0,
  }
  let monthlyApplications = await Leave.aggregate([
    { $match: {} },
    { $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        count: { $sum: 1 },
      }
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ])
  if(req.user.role === 'user') {
   monthlyApplications = await Leave.aggregate([
    { $match: {createdBy: mongoose.Types.ObjectId(req.user.userId)} },
    { $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        count: { $sum: 1 },
      }
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
   ])
  }
  monthlyApplications = monthlyApplications.map((item)=>{
    const {
      _id: { year, month},
      count,
    } = item
    const date = moment()
      .month(month - 1)
      .year(year)
      .format('MMM Y')
    return { date, count }
  })
  .reverse()
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}

export {applyLeave, deleteLeave, getAllLeaves, updateLeave, showStats}
