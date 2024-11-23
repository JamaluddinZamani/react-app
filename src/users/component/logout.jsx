import { useEffect } from "react";

const Logout = ()=>{
    useEffect(()=>{
        window.localStorage.removeItem("token");
        window.location = "/";
    },[]);
    return (
        <div>
            
        </div>
    );
}

export default Logout;