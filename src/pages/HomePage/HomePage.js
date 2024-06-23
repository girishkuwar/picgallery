import React, { useState } from 'react'
import icon from '../../assets/icon.jpg'
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async () => {
        let options = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "identity": email,
                "password": password
            }),
        }

        fetch("http://127.0.0.1:8090/api/collections/users/auth-with-password", options)
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                if (json.code !== 400) {
                    localStorage.setItem('username',json.record.name);
                    localStorage.setItem('userid', json.record.id);
                    navigate("/feeds");
                    window.location.reload();
                }
            })
    }


    return (
        <div className='home'>
            <img src={icon} alt="" />
            <div className="form">
                <h4> Welcome </h4>
                <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                <button onClick={login}>Login</button><span>New Here <Link to={"/signup"}>Create Account</Link></span>
            </div>
        </div>
    )
}

export default HomePage