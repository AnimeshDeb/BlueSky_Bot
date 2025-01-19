import express from 'express'
import authEndpt from './Endpoints/authEndpt.js'
import cors from 'cors'
const app=express()
app.use(cors({
  origin:'http://localhost:5173',
}))
app.use(express.json())
app.get('/',(req,res)=>{
  res.send("Backend working")
})
app.use('/signup',authEndpt)


app.listen(3000,()=>{
  console.log('Server running on port 3000')
})
