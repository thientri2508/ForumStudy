import React, { useState } from 'react';
import './Auth.css';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import logoIcon from '../image/logo.jpg';
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const Auth = () => {
    const login = () => {
        var a = document.getElementById("loginBtn");
        var b = document.getElementById("registerBtn");
        var x = document.getElementById("login");
        var y = document.getElementById("register");

        x.style.left = "4px";
        y.style.right = "-520px";
        a.className += " white-btn";
        b.className = "btn";
        x.style.opacity = 1;
        y.style.opacity = 0;
    }

    const register = () => {
        var a = document.getElementById("loginBtn");
        var b = document.getElementById("registerBtn");
        var x = document.getElementById("login");
        var y = document.getElementById("register");

        x.style.left = "-510px";
        y.style.right = "5px";
        a.className = "btn";
        b.className += " white-btn";
        x.style.opacity = 0;
        y.style.opacity = 1;
    }

    const {
		authState: { authLoading, isAuthenticated }
	} = useContext(AuthContext)

    const [error, setError] = useState({
        loading: false,
        message: ''
    })

    let body

	if (authLoading)
		body = (
			<Loader></Loader>
		)
	else if (isAuthenticated) return window.location.href = "/";
	else
		body = (
			<div className="form-box">

                <LoginForm></LoginForm>
                <RegisterForm error={error} setError={setError}></RegisterForm>

            </div>
		)

    return (
        <div className='body'>
            <div className="wrapper">
                <nav className="nav">
                    <a href='/'>
                        <div className="nav-logo">
                            <img src={logoIcon} className='logo'></img>
                        </div>
                    </a>

                    { error.loading ? (<ErrorMessage message={error.message}></ErrorMessage>) : (<></>) }

                    <div className="nav-button">
                        <button className="btn white-btn" id="loginBtn" onClick={() => {login()}}>Sign In</button>
                        <button className="btn" id="registerBtn" onClick={() => {register()}}>Sign Up</button>
                    </div>
                </nav>
                {body}
                
            </div>
        </div> 
    );
};

export default Auth;