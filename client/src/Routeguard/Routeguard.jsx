import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
// import Cookies from 'js-cookie'

function Routeguard({children})//children refers to the components surrounded by routeguard
{
    
    // const [result, setResult]=useState(null)
    const navigate=useNavigate()
    const apiUrl=import.meta.env.VITE_URL
    useEffect(()=>{
        const checker=async()=>{
            try{
                const response=await fetch(`${apiUrl}/confirmToken`,{
                    credentials:'include',
                })
                const data=await response.json()
                if(data.authenticated===false)
                {
                    navigate('/login')
                }
            }
            
            catch(error)
            {
                console.error(error)
                navigate('/login')
            }
        }
        checker()

    },[navigate])
    return children
    
}
export default Routeguard