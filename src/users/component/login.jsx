
import axios from "axios";
import "../css/styleForLogin.css";


import { useState } from "react";
import * as yup from 'yup';

const Login = (props)=>{
    const [account , setAccount] = useState({email:'',password:''});
    const [errors , setErrors] = useState();

    const schema = yup.object().shape({
        email: yup.string().email("Invalid Email").required("Email is required"),
        password: yup.string().min(4 , "The password must be at least four characters long")
    });

    async function validate(){
        try{
            const result = await schema.validate(account , {abortEarly : false});
            return result;
        }catch(error){
            setErrors(error.errors);
        }
    }
    async function handleSubmit(e){
        e.preventDefault();
        const result = await validate();
        if(result){
            try {
                const respons = await axios.post("http://localhost/forReactServerSide/api/login.php", account);
                setErrors(null);
                if(respons.data.have_account == "yes"){
                    localStorage.setItem("token" , respons.data.token);
                    window.location = "/dashboard";
                }else if(respons.data.have_account == "no"){
                    setErrors(["Invalid Email or password"]);
                }
            } catch (error) {
                setErrors(error);
            }

        }            
    }
    function handleChange(e){
        const input = e.currentTarget;
        const newAcount = {...account};
        newAcount[input.name] = input.value;
        setAccount(newAcount);
    }
    return (
        <div className="login_form_container">
            <div className="error_container">
                <ul>
                    {
                        (errors ? 
                            (errors.map((e,i)=> <li key={i}>{e}</li>))
                            : null
                        )
                    }
                </ul>
            </div>
            <form action="" onSubmit={handleSubmit} className="login_form">
                <label htmlFor="email">Email :</label>
                <input type="text" name="email" id="email" onChange={handleChange} />
                <label htmlFor="password">PassWord :</label>
                <input type="text" name="password" id="password" onChange={handleChange} />
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}

export default Login;