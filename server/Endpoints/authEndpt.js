import express from 'express'
const router=express.Router()

// const app=express()
router.post('/', (req,res)=>{
    const {email, password}=req.body;
    console.log("email is: ", email, "password: ", password)
    res.send(`email is: ${email} and password is: ${password}`)
})
export default router