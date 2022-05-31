import mongoose from 'mongoose'

const LeaveSchema = new mongoose.Schema({
  entitlement: {
    type: String,
    enum: ['annual', 'medical'],
    default: 'annual',
  },
  session: {
    type: String,
    enum: ['full day', '1st half day', '2nd half day'],
    default: 'full day',
  },
  from: {
    type: Date,
    required: [true, 'Please provide start date leave'],
  },
  to: {
    type: Date,
    required: [true, 'Please provide end date leave'],
  },
  annualQuota: {
    type: Integer,
    default: 14,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user']
  },
},
{ timestamps: true }
)
export default mongoose.model('Leave', LeaveSchema)
