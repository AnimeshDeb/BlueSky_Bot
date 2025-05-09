import express from 'express';
import mongoose from 'mongoose';
import VerificationCodeModel from '../Schema/VerificationCode/verificationCode.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/', async (req, res) => {
  const { email } = req.body;
  await mongoose.connect(process.env.CONNECTION_STRING);
  const codeExpire = await VerificationCodeModel.findOne({ email: email });
  if (codeExpire) {
    mongoose.disconnect();
    
    return res.json({ data: 'Not Expire' });
  }

  mongoose.disconnect();
  return res.json({ data: 'Expired' });
});

export default router;
