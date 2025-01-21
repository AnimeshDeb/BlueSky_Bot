import express from 'express';
import bcrypt from 'bcrypt';
import AuthenticationModel from '../Schema/Authentication/authentication.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    
    const connection=await mongoose.connect(process.env.CONNECTION_STRING)
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const authInformation = await AuthenticationModel.create({
      email: email,
      password: hashedPassword,
    });
    console.log(authInformation)
  } catch (error) {
    console.error(error);
  }
});
export default router;
