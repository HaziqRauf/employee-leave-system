import express from 'express'
const router = express.Router()

import {
  applyLeave,
  deleteLeave,
  getAllLeaves,
  updateLeave,
  showStats
} from '../controllers/leaveController.js'

router.route('/').post(applyLeave).get(getAllLeaves)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteLeave).patch(updateLeave)


export default router
