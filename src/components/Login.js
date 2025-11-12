import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import './Login.css'


function Login () {
    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
         e.preventDefault();

         const success = login(username, password);
         if (success){
            alert("Logged in Succesfully!");
            navigate("/")
         } else {
            alert("invalid username or password. Try again.")
         }
    };

    return (
        <div className="login-container" >
            <h2>Login to ShopEase</h2>
            <form onSubmit={handleLogin} className="login-form" >
                <input 
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
    

}

export default Login