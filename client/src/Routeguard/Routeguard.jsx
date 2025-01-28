import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Cookies from 'js-cookie'
function Routeguard({children})//children refers to the components surrounded by routeguard
{
    const navigate=useNavigate()
    const token=Cookies.get('AuthToken')//retrieving cookie from backend

    useEffect(()=>{
        if(!token)
        {
            navigate('/login')
        }
    },[token,navigate])
    return children
    
}
export default Routeguard