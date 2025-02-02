import express from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AuthenticationModel from '../Schema/Authentication/authentication.js';
import jwt from 'jsonwebtoken'
import verify from '../Middleware/verifyToken.js'

dotenv.config();
const router = express.Router();
router.post('/', async (req, res) => {
  try {
    const connection = await mongoose.connect(process.env.CONNECTION_STRING);
    const { email, password } = req.body;
    
    const hashedPassword = await AuthenticationModel.findOne({
      email: email,
    }).select('password');
    const user=await AuthenticationModel.findOne({
      email:email,
    })
    console.log("user is: ", user)

    const match = await bcrypt.compare(password, hashedPassword.password)
    if (match===true)
    {
        const token=jwt.sign({_id: user._id, email: email}, process.env.SECRET_TOKEN)//jwt.sign({data1: .. , data2:..,etc}, secretkey), generating a specific token for a specific user
        //passing token back to frontend so that subsequent calls to backend can include token for authorization
        res.cookie('AuthToken', token, {
          httpOnly:true,//prevent access to cookie via js, prevents clientside js from accessing cookie if set to true
          secure: process.env.NODE_ENV==='production', //only send cookie over https in production
          sameSite: 'Strict',
          maxAge: 3600000 //cookie exp 1ht
        });
        res.json({data:true})


        

    }
    else res.json({data:false})
    mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
});


export default router;
