import React from 'react';
import './style.css';
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import jwt_decode from 'jwt-decode'
import LoginFacebook from './LoginFacebook';

const LoginForm = () => {

    const [loading, setLoading] = useState(false)

    async function handleCallbackResponse(response){
        setLoading(true)
        var userObject = await jwt_decode(response.credential)
        //console.log(userObject)
        var user = {
            username: userObject.email,
		    password: '123456',
            fullname: userObject.name,
            avatar: userObject.picture,
            role: 'USER',
            signinWith: 'indirect'
        }
        try {
			await loginWithGoogle(user)
		} catch (error) {
			console.log(error)
		}
        setLoading(false)
    }
    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: "102280980329-isgttmqtmgj71lnac481dvc931p69vcp.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })

        window.google.accounts.id.renderButton(
            document.getElementById("signInGG"),
            { theme: "outline", size: "large", locale: "en", width: 220 } 
        )
    }, [])

    // Context
	const { loginUser, loginWithGoogle } = useContext(AuthContext)

	// Local state
	const [loginForm, setLoginForm] = useState({
		username: '',
		password: ''
	})

    const [alert, setAlert] = useState(null)

    const { username, password } = loginForm

	const onChangeLoginForm = event =>
		setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

	const login = async event => {
		event.preventDefault()

		try {
			const loginData = await loginUser(loginForm)
			if (!loginData.success) {
				
			}
		} catch (error) {
			console.log(error)
		}
	}

    return (
        <div class="login-container" id="login"> 
        { loading ? (<div className='LoadingAddPost'><div class="loader"></div></div>) : (<></>) }
        <form onSubmit={login}>
            <div class="top">
                <header><b>Sign In</b></header>
            </div>
            <div className='LogginWith'>
                <div className='btn-LogginWith' id='signInGG'>
                    
                </div>
                <ul className='btn-LogginWith'>
                    <LoginFacebook setLoading={setLoading}></LoginFacebook>
                </ul>
            </div>
            <div class="input-box">
                <input type="text" class="input-field" placeholder="Username" value={username} onChange={onChangeLoginForm} name='username' required></input>
                <i class="bx bx-user" style={{ fontSize: '18px', marginTop: '-4px'}}></i>
            </div>
            <div class="input-box">
                <input type="password" class="input-field" placeholder="Password" value={password} onChange={onChangeLoginForm} name='password' required></input>
                <i class="bx bx-lock-alt" style={{ fontSize: '18px', marginTop: '-4px'}}></i>
            </div>
            <div class="input-box">
                <input type="submit" class="submit" value="Sign In"></input>
            </div>
            <div class="two-col">
                <div class="one">
                    <input type="checkbox" id="login-check"></input>
                    <label for="login-check"> Save My Information</label>
                </div>
                <div class="two">
                    <label><a href="#">Forget Password?</a></label>
                </div>
            </div>
            {/* <AlertMessage info={alert} /> */}
        </form>
        </div>
    );
};

export default LoginForm;