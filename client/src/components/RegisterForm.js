import React from 'react';
import { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const RegisterForm = ( {error, setError} ) => {

    // Context
	const { registerUser } = useContext(AuthContext)

	// Local state
	const [registerForm, setRegisterForm] = useState({
        fullname: '',
		username: '',
		password: '',
        confirm: '',
        role: 'USER',
        signinWith: 'direct',
        avatar: '',
	})

    const { fullname, username, password, confirm } = registerForm

    const onChangeRegisterForm = event =>
        setRegisterForm({ ...registerForm, [event.target.name]: event.target.value })

    const register = async event => {
        event.preventDefault()
        if(password != confirm) {
            setError({...error, loading: true, message: 'Confirm password is incorrect'})
            return
        }
        try {
            const registerData = await registerUser(registerForm)
            if (!registerData.success) {
                
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div class="register-container" id="register">
            <form onSubmit={register}>
            <div class="top" style={{marginTop: '-15px'}}>
                <header><b>Sign Up</b></header>
            </div>
            <div class="input-box">
                <input type="text" class="input-field" placeholder="Full Name" onChange={onChangeRegisterForm} value={fullname} name='fullname' required ></input>
                <ion-icon name="happy-outline" style={{fontSize: '18px', position: 'relative', top: '-40px', left: '17px'}}></ion-icon>
            </div>
            <div class="input-box">
                <input type="text" class="input-field" placeholder="Username" onChange={onChangeRegisterForm} value={username} name='username' required ></input>
                <i class="bx bx-user" style={{ fontSize: '18px', marginTop: '-4px'}}></i>
            </div>
            <div class="input-box">
                <input type="password" class="input-field" placeholder="Password" onChange={onChangeRegisterForm} value={password} name='password' required ></input>
                <i class="bx bx-lock-alt" style={{ fontSize: '18px', marginTop: '-4px'}}></i>
            </div>
            <div class="input-box">
                <input type="password" class="input-field" placeholder="Confirm Password" onChange={onChangeRegisterForm} value={confirm} name='confirm' required></input>
                <ion-icon name="shield-checkmark-outline" style={{fontSize: '18px', position: 'relative', top: '-40px', left: '17px'}}></ion-icon>
            </div>
            <div class="input-box">
                <input type="submit" class="submit" value="Sign Up"></input>
            </div>
            </form>
        </div>
    );
};

export default RegisterForm;