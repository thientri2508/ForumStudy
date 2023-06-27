import React from 'react';
import { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const LoginForm = () => {

    // Context
	const { loginUser } = useContext(AuthContext)

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
				setAlert({ type: 'danger', message: loginData.message })
				setTimeout(() => setAlert(null), 5000)
			}
		} catch (error) {
			console.log(error)
		}
	}

    return (
        <div class="login-container" id="login">
        <form onSubmit={login}>
            <div class="top">
                <header>LOGIN</header>
            </div>
            <div class="input-box">
                <input type="text" class="input-field" placeholder="Username" value={username} onChange={onChangeLoginForm} name='username' required></input>
                <i class="bx bx-user"></i>
            </div>
            <div class="input-box">
                <input type="password" class="input-field" placeholder="Password" value={password} onChange={onChangeLoginForm} name='password' required></input>
                <i class="bx bx-lock-alt"></i>
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