import express from 'express'


const router=express.Router()

router.get('/',(req,res)=>{
    res.clearCookie('AuthToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        path: '/',
      });
      res.status(200).json({ message: 'logout success' });
})
export default router