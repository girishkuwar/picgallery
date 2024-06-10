import React, { useState } from 'react'
import icon from '../../assets/icon.jpg'
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [name, setName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    const signup = async () => {
        let options = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "name": name,
                "password": password,
                "passwordConfirm": password,
            }),
        }

        let p = await fetch("http://127.0.0.1:8090/api/collections/users/records", options)
            .then((res) => res.json())
            .then((json) => {
                alert(`Message Send Thank you for visiting ${name}`);
                console.log(json);
                navigate('/');
            }
            );
    }

    return (
        <div className='signup'>
            <img src={icon} alt="" />
            <h4> Create New Account </h4>
            <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder='Email' onChange={(e) => setemail(e.target.value)} />
            <input type="password" placeholder='Password' onChange={(e) => setpassword(e.target.value)} />
            <button onClick={signup}>Signup</button><span>Allready Have Account <Link to={"/"}>Login</Link></span>
        </div>
    )
}

export default SignupPage