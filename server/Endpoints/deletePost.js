import express from 'express'
import mongoose from 'mongoose'
import PostModel from '../Schema/Posts/post.js'
import verify from '../Middleware/verifyToken.js'
const router=express.Router()

router.post('/',verify,async(req,res)=>{
await mongoose.connect(process.env.CONNECTION_STRING)
const { text}=req.body 
const email=req.user.email
const delTarget=await PostModel.updateOne(//used to remove element from an array based on if text provided matches
    //text field in array element (updating entry)
    {email},
    {$pull: {post:{text:text}}}
);
const isEmpty=await PostModel.findOne({email},{post:1})//finds first entry in db where email field contains
// the email constant that we are considering, and then we are specifying that we only want the post field
//isEmpty is an object containing the post array 
if (isEmpty)
{
    if(isEmpty.post.length===0)//accessing the length of the post array, which is inside the isEmpty object
    {
        await PostModel.deleteOne({email})//deleting first instance of entry where email corresponds to the email we are considering
        console.log("Array empty, so deleted user")
    }
    else{
        console.log("Array not empty")
    }
}




mongoose.disconnect()



})

export default router