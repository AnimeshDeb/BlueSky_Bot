import express from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AuthenticationModel from '../Schema/Authentication/authentication.js';

dotenv.config();
const router = express.Router();
router.post('/', async (req, res) => {
  try {
    const connection = await mongoose.connect(process.env.CONNECTION_STRING);
    const { email, password } = req.body;
    const hashedPassword = await AuthenticationModel.findOne({
      email: email,
    }).select('password');

    const match = await bcrypt.compare(password, hashedPassword.password)
    if (match===true)
    {
        res.json({data:true})
    }else res.json({data:false})
    mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
});
export default router;
