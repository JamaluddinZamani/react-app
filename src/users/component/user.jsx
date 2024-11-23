
import { useState , useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const User = ()=>{
    const [user , setUser] =useState({});
    const {id} = useParams();

    const navigate = useNavigate();
    const handleRedirect = ()=>{
        navigate("/users",{replace : true});
    }

    useEffect(()=>{
        const fetchData = async ()=>{
            const respons = await axios.get(`http://localhost/forReactServerSide/api/users.php?id=${id}`);
            setUser(respons.data);    
        }
        fetchData();
    },[]);

    return (
        <div style={{textAlign:"center"}}>
            <button onClick={handleRedirect} style={{backgroundColor:"rgb(80,150,250)"}}>Back to users</button>
            <div className="user_container" key={user.id} style={{margin:"50px auto"}}>
                <img
                    src={`http://localhost/forReactServerSide/api/${user.photo}`}
                    style={{ borderRadius: "50%", width: "100px", height: "100px" }}
                    alt="user"
                />
                <h4>
                    {user.first_name} {user.last_name}
                </h4>
                <h5>{user.email}</h5>
            </div>
        </div>
    );
}

export default User;