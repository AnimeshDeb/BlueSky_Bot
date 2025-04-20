import express from 'express'
import verify from '../Middleware/verifyToken.js'
import mongoose from 'mongoose'
import PostModel from '../Schema/Posts/post.js'
const router=express.Router()

router.get('/', verify, async (req,res)=>{
    const email=req.user.email
    await mongoose.connect(process.env.CONNECTION_STRING)

    try{
        const query=await PostModel.findOne({email: email}
        )
        // if(!query){
        //     return res.json({data:"NULL"})
        // }

        const textFields = query.post.map(item => ({
            text:item.text,
            _id:item._id.toString(),
        }));

        console.log("query: " , textFields)
       
        // const text=query.post[0].text
        // const username=query.post[0].username
        // const password=query.post[0].password
        // const calendar=query.post[0].calendar
        // const time=query.post[0].time
       
        res.json({data: textFields})
        
    }
    catch(error){console.error(error)}
    //querying for a document containing the user email, where the specific id field 
    // of the post[] is the id of the component we are considering in the frontend.

    

    await mongoose.disconnect()

})

export default router