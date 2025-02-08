import express from 'express'
import verify from '../Middleware/verifyToken.js'
import mongoose from 'mongoose'
import PostModel from '../Schema/Posts/post.js'
const router=express.Router()

router.post('/',verify,async(req,res)=>{
    try{
        
    const {text,username, password, calendar, time }=req.body
    console.log("req,", text)

    const connection=await mongoose.connect(process.env.CONNECTION_STRING)
    const exists=await PostModel.exists({email:req.user.email})
    if(exists){
       
        await PostModel.findOneAndUpdate(
            {
                email:req.user.email,
            },
            {
                $push:{
                    post: {text,username,password,calendar,time}
                },
            }
        )
    }
    else{
        const PostInformation=await PostModel.create({
            email:req.user.email,
            post:{text:text,username:username, password:password, calendar:calendar,time:time}
    
        })
        console.log(PostInformation)
    }
   
    
    console.log("Post created successfully")



    // const response=await fetch('https://bsky.social/xrpc/com.atproto.server.createSession',{
    // method:'POST',
    // headers:{
    //     'Content-Type': 'application/json',
    // },
    // body: JSON.stringify({identifier:username, password:password}),
    // })
    // const data=await response.json()
    // const accessjwt=data.accessJwt 
    // const refreshjwt=data.refreshJwt
    // //works so far
    

    mongoose.disconnect()
    return res.json({text:text, username:username, password:password,calendar:calendar, time:time})
    }
    catch(error)
    {
        console.error(error)
    }
})
export default router