
import { useLocation } from "react-router-dom";
function Home(){
    const location=useLocation();
    const isLogged=location.state?.isLogged
    console.log("isLogged:  ", isLogged)
    return(
        <div>

            Home page
        </div>
    )
}
export default Home;