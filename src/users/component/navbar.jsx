
import "../css/styleForNavbar.css";
import { Link , NavLink } from "react-router-dom";

const Navbar = ()=>{
    const token = localStorage.getItem("token");

    return (
        <div className="nav_container">
            <NavLink to="/" className="">Home</NavLink>
            <NavLink to="/users" className="">Users</NavLink>
            {
                (token) ? (
                    <>
                        <NavLink to="/dashboard" className="">Dashboard</NavLink>
                        <NavLink to="/logout" className="">Logout</NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className="">Login</NavLink>
                        <NavLink to="/register" className="">Register</NavLink>
                    </>
                )
            }
        </div>
    );
}

export default Navbar;