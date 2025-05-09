// import express from 'express'
// import verify from '../Middleware/verifyToken.js'
// import mongoose from 'mongoose'
// import PostModel from '../Schema/Posts/post.js'
// import runProcess from '../scripts/cronjob.js'
// const router=express.Router()

// router.post('/',verify,async(req,res)=>{
//     try{
        
//     const {text,username, password, calendar, time }=req.body
//     console.log("req,", text)

//     const connection=await mongoose.connect(process.env.CONNECTION_STRING)
//     const exists=await PostModel.exists({email:req.user.email})
//     if(exists){
       
//         await PostModel.findOneAndUpdate(
//             {
//                 email:req.user.email,
//             },
//             {
//                 $push:{
//                     post: {text,username,password,calendar,time}
//                 },
//             }
//         )
//     }
//     else{
//         const PostInformation=await PostModel.create({
//             email:req.user.email,
//             post:{text:text,username:username, password:password, calendar:calendar,time:time, script:"true"}
    
//         })
//         runProcess(req.user.email)
//         console.log(PostInformation)
//     }
   
    
//     console.log("Post created successfully")




//     mongoose.disconnect()
//     return res.json({data:"Success"})

    



//     }
//     catch(error)
//     {
//         console.error(error)
//     }
// })
// export default router



import express from 'express'
import verify from '../Middleware/verifyToken.js'
import mongoose from 'mongoose'
import PostModel from '../Schema/Posts/post.js'
import runProcess from '../scripts/cronjob.js'
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
            post:{text:text,username:username, password:password, calendar:calendar,time:time, script:"true"}
    
        })
        // runProcess(req.user.email)
        console.log(PostInformation)
    }
   
    
    console.log("Post created successfully")




    mongoose.disconnect()
    return res.json({data:"Success"})

    



    }
    catch(error)
    {
        console.error(error)
    }
})
export default router
