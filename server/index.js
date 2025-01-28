import express from 'express'
import signup from './Endpoints/signup.js'
import cors from 'cors'
import login from './Endpoints/login.js'
import cookieParser from 'cookie-parser'
const app=express()

app.use(cors({
  origin:'http://localhost:5173',
  credentials:true,
}))

app.use(express.json())
app.use(cookieParser())
app.get('/',(req,res)=>{
  res.send("Backend working")
})

app.use('/signup',signup)
app.use('/login', login)


app.listen(3000,()=>{
  console.log('Server running on port 3000')
})
