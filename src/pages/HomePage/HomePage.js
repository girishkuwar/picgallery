import React, { useState } from 'react'
import icon from '../../assets/icon.jpg'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

const HomePage = () => {
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("Logged Successfuly");
                alert("LogIn Successfully");
                localStorage.setItem("user", user.uid);
                localStorage.setItem("useremail", user.email);
                console.log(user);
                getUser(user.uid);


            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Error")
                alert("Error")
            });
    }

    const getUser = async (id) => {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            localStorage.setItem("userdetails", docSnap.data().name);
            navigate('/');
        } else {
            console.log("No such document!");
        }
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