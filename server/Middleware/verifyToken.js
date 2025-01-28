import jwt from 'jsonwebtoken'

export default function(req,res,next)
{
    const token=req.header('AuthToken')

    if(!token)
    {
        return res.status(401).send('Access Denied')//user isn't logged in successfully
    }
    try{
        const verified=jwt.verify(token,process.env.SECRET_TOKEN)//verified refers to the payload in the jwt 
        req.user=verified//can use req.user in other files now if we use this middleware function
        next()

    }
    catch(error)
    {
        res.status(400).send('Invalid Token')
    }
}