
import { useNavigate } from "react-router-dom";
import { useState , useEffect} from "react";
import axios from "axios";

const Dashboard = ()=>{
    const [token , setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();
    const [isAuthenticated , setIsAuthenticated] = useState(false);
    useEffect(()=>{
        const auth = async ()=>{
            if(token && isAuthenticated == false){
                const respons = await axios.get("http://localhost/forreactServerSide/api/login.php" ,
                {headers:{"token":token}}
                )
                setIsAuthenticated(!!(respons.data.email && respons.data.password) ? true : false);
                setToken(null);
            }else if(isAuthenticated == false && token == null){
                navigate("/login" , {replace : true});
            }
        }
        auth();
        
    },[isAuthenticated])
    return (
        <div>
            {
                token && (
                    <h1 style={{textAlign:"center"}}>Dashboard</h1>
                )
            }
        </div>
    );
}

export default Dashboard;