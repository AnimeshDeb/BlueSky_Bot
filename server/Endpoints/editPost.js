import express from 'express'
import verify from '../Middleware/verifyToken.js'
import mongoose from 'mongoose'
import PostModel from '../Schema/Posts/post.js'
import runProcess from '../scripts/cronjob.js'
const router=express.Router()

router.post('/',verify,async(req,res)=>{
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);

        const { userID, userText } = req.body;
        const email=req.user.email
        const messageID=new mongoose.Types.ObjectId(`${userID}`)

        const result = await PostModel.findOneAndUpdate(
          { email, 'post._id': messageID },
          { $set: { 'post.$.text': userText } },
          { new: true } 
        );
      
        await mongoose.disconnect();
      
        if (!result) {
          return res.status(404).json({ error: 'Post not found' });
        }
      
        return res.json({ data: result });
      } catch (err) {
        console.error('Error updating post:', err);
        return res.status(500).json({ error: 'Server error' });
      }
})
export default router

