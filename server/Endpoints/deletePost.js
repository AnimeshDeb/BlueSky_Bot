import express from 'express';
import mongoose from 'mongoose';
import PostModel from '../Schema/Posts/post.js';
import verify from '../Middleware/verifyToken.js';
const router = express.Router();

router.post('/', verify, async (req, res) => {
    try{
        await mongoose.connect(process.env.CONNECTION_STRING);
        const { messageID } = req.body;
        const objMessageID = new mongoose.Types.ObjectId(`${messageID}`);
        const email = req.user.email;
        const delTarget = await PostModel.updateOne(
          //used to remove element from an array based on if text provided matches
          //text field in array element (updating entry)
          { email },
          { $pull: { post: { _id: objMessageID } } }
        );
        
        const postRemoved=await PostModel.findOne({
          email,
         'post._id': objMessageID,
      
      
        })
      
        if(!postRemoved){return res.json({data:true})}
       
    }
    catch(error){return res.json({data:false})}//in case of errors or same message id 
    //being repeatedly entered
  

  mongoose.disconnect();
});

export default router;
