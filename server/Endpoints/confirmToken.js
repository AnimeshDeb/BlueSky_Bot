import express from 'express'
import jwt from 'jsonwebtoken'

const router=express.Router()

router.get('/',async(req,res)=>{
    const token=req.cookies.AuthToken
    if(!token)
        {
            return res.json({authenticated:false})
        }
    try{
        const verified=jwt.verify(token, process.env.SECRET_TOKEN)
        return res.json({authenticated:true})
    }
    catch(error)
    {
        console.error(error)
    }
    

});

export default router;