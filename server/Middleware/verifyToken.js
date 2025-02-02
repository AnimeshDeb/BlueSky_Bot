import jwt from 'jsonwebtoken'
import express from 'express'
export default async function(req,res,next)
{
    const token=req.cookies.AuthToken;
    

    if(!token)
    {
        return res.status(401).send('Access Denied')//user isn't logged in successfully
    }
    try{
        const verified=await jwt.verify(token,process.env.SECRET_TOKEN)//verified refers to the payload in the jwt 
        req.user=verified//can use req.user in other files now if we use this middleware function
        next()

    }
    catch(error)
    {
        res.status(400).send('Invalid Token')
    }
}