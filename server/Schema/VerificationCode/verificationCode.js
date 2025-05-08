import { Schema, model } from 'mongoose';

const verificationCodeSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    code: {
      type: Number,
      required: true,
      validate: {
        validator: function(value) {
          return /^[0-9]{6}$/.test(value.toString()); 
        },
        message: 'Code must be a 6-digit number',
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,  // Automatically set the current date and time
    },
  },
  { timestamps: true } 
);

// TTL Index for auto expiration 
verificationCodeSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300}); 

const VerificationCodeModel = model('VerificationCode', verificationCodeSchema);

export default VerificationCodeModel;
