import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AuthenticationModel from '../Schema/Authentication/authentication.js';
import bcrypt from 'bcrypt';
const router = express.Router();

router.patch('/', async (req, res) => {
  const { email, newPassword } = req.body;
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const connection = await mongoose.connect(process.env.CONNECTION_STRING);

  const query = await AuthenticationModel.findOneAndUpdate(
    { email },
    { $set: { password: hashedPassword } },
    { new: true }
  );
//   console.log("PASSWWORD RESET: ", query)
  await mongoose.disconnect();
  if (!query) {
    return res.status(404).json({ error: 'Could not find user.' });
  }

  return res.json({ data: 'Password Changed' });
});

export default router;
