import express from 'express'
import verify from '../Middleware/verifyToken.js'
import mongoose from 'mongoose'
import PostModel from '../Schema/Posts/post.js'
const router=express.Router()

router.post('/',verify,async(req,res)=>{
    try{
        
    const {text,date,username,password }=req.body
    

    const connection=await mongoose.connect(process.env.CONNECTION_STRING)
    const PostInformation=await PostModel.create({
        post: text,
        email: req.user.email,

    })
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
    

    
    return res.json({text:text, date:date, username:username,password:password})
    }
    catch(error)
    {
        console.error(error)
    }
})
export default router