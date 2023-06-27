import React from 'react';
import './Auth.css';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import logoIcon from '../image/logo.jpg';
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import Loader from '../components/Loader';

const Auth = () => {
    
    const myMenuFunction = () => {
        var i = document.getElementById("navMenu");
    
        if(i.className === "nav-menu") {
            i.className += " responsive";
        } else {
            i.className = "nav-menu";
        }
    }

    
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

    let body

	if (authLoading)
		body = (
			<Loader></Loader>
		)
	else if (isAuthenticated) return window.location.href = "/";
	else
		body = (
			<div className="form-box">

                <LoginForm register={register}></LoginForm>
                <RegisterForm login={login}></RegisterForm>

            </div>
		)

    return (
        <div className='body'>
            <div className="wrapper">
                <nav className="nav">
                    <a href='/'>
                        <div className="nav-logo">
                            <img src={logoIcon} className='logo'></img>
                            <p>Người Bạn Toán</p>
                        </div>
                    </a>

                    <div className="nav-button">
                        <button className="btn white-btn" id="loginBtn" onClick={() => {login()}}>Đăng nhập</button>
                        <button className="btn" id="registerBtn" onClick={() => {register()}}>Đăng kí</button>
                    </div>
                    <div className="nav-menu-btn">
                        <i className="bx bx-menu" onClick={() => {myMenuFunction()}}></i>
                    </div>
                </nav>
                {body}
                
            </div>
        </div>
    );
};

export default Auth;