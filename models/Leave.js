import mongoose from 'mongoose'

const LeaveSchema = new mongoose.Schema({
  entitlement: {
    type: String,
    enum: ['annual', 'medical'],
    default: 'annual',
  },
  status: {
    type: String,
    enum: ['interview', 'declined', 'pending'],
    default: 'pending',
  },
  session: {
    type: String,
    enum: ['full day', '1st half day', '2nd half day'],
    default: 'full day',
  },
  fromdate: {
    type: Date,
    required: [true, 'Please provide start date leave'],
  },
  todate: {
    type: Date,
    required: [true, 'Please provide end date leave'],
  },
  countDay: {
    type: Number,
    validator: Number.isInteger,
    default: 0,
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
