import express from 'express'
import signup from './Endpoints/authEndpt.js'
import cors from 'cors'
const app=express()
app.use(cors({
  origin:'http://localhost:5173',
}))
app.use(express.json())
app.get('/',(req,res)=>{
  console.log("WORKING BACKEND")
})
app.use('/signup',signup)


app.listen(3000,()=>{
  console.log('Server running on port 3000')
})

// app.get('/',(req,res)=>{
//   console.log('BACKEND WORKING')
// })
// app.listen(3000,()=>{
//   console.log('Server running on port 3000')
// })