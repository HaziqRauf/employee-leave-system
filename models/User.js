import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required:[true, 'Please provide name'],
    minlength:3,
    maxlength: 20,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: 'lastName',
  },
  email: {
    type: String,
    required:[true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required:[true, 'Please provide password'],
    minlength: 6,
    select: false,
  },
  annualQuota: {
    type: Number,
    validator: Number.isInteger,
    default: 12,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  leaves: [{
    type: mongoose.Types.ObjectId,
    ref: 'Leave',
  }],
})

UserSchema.pre('save', async function(){
  // console.log(this.modifiedPaths())
  // console.log(this.isModified('name'))
  if (!this.isModified('password')) return 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function() {
    return jwt.sign({id: this._id, role: this.role}, process.env.JWT_SECRET,{
      expiresIn: process.env.JWT_LIFETIME
    })
}

UserSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}
export default mongoose.model('User', UserSchema)
