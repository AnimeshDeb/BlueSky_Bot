import express from 'express'
const router=express.Router()

// const app=express()
router.post('/', (req,res)=>{
    const {email, password}=req.body
    res.json({status:'ok', data:`email: ${email} and password: ${password}`})
})
export default router;