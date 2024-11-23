
import { Component } from "react";
import Users from "./component/users";
import Navbar from "./component/navbar";
import Home from "./component/home";
import Register from "./component/register";
import Login from "./component/login";
import { BrowserRouter as Router , Route , Routes , Navigate} from "react-router-dom";
import User from "./component/user";
import NotFound from "./component/notFound";
import Dashboard from "./component/dashboard";
import Logout from "./component/logout";

class App extends Component{
    render(){
        return (
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/users" element={<Users />} />

                        <Route  path="/users/:id" element={<User />} />
                        
                        <Route path="/login"  element={<Login id="loginID"/>} />
                        <Route path="/register" element={<Register />} />
                        
                        <Route path="/not-found" element={<NotFound />} />
                        <Route path="*" element={<Navigate to="/not-found" />} />
                        
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Router>
        );
    }
}


export default App;