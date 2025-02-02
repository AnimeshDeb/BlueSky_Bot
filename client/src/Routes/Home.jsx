import { useState } from 'react'

function Home(){
    const [text, setText]=useState("")
    const [date, setDate]=useState("")
    const [username, setUsername]=useState("")
    const [password, setPassword]=useState("")
    
    const handleChangeText=(event)=>{
        setText(event.target.value)
    }
    const handleChangeDate=(event)=>{
        setDate(event.target.value)
    }
    const handleChangeUsername=(event)=>{
        setUsername(event.target.value)
    }
    const handleChangePassword=(event)=>{
        setPassword(event.target.value)
    }
    const handleSubmit=async()=>{
        console.log(text,date)

        const response=await fetch('http://localhost:3000/makePost',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            credentials:'include',
            body: JSON.stringify({
                text:text,
                date:date,
                username:username,
                password: password,
            })
        })
        const data=await response.json()
        console.log("data ", data)
    }

    return(
        <div className="container">
            <input type="text" placeholder="Usernaame" value={username} onChange={handleChangeUsername}/>
            <input type="text" placeholder="Password" value={password} onChange={handleChangePassword}/>
            <input type="text" placeholder="Text" value={text} onChange={handleChangeText}/>
            <input type="text" placeholder="Date" value={date} onChange={handleChangeDate}/>
            <button onClick={handleSubmit}> Submit</button>
        </div>
    )
}
export default Home;