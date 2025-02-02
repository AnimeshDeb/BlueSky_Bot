import express from 'express'
import verify from '../Middleware/verifyToken.js'
const router=express.Router()

router.post('/',verify,async(req,res)=>{
    const {text,date, username, password}=req.body
    const response=await fetch('https://bsky.social/xrpc/com.atproto.server.createSession',{
    method:'POST',
    headers:{
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({identifier:username, password:password}),
    })
    const data=await response.json()
    const accessjwt=data.accessJwt 
    const refreshjwt=data.refreshJwt
    //works so far
    

    
    return res.json({text:text, date:date, username:username,password:password})
})
export default router