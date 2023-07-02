import React from 'react'
import { LoginSocialFacebook } from 'reactjs-social-login'
import { FacebookLoginButton } from 'react-social-login-buttons'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const LoginFacebook = ({setLoading}) => {

    const { loginWithGoogle } = useContext(AuthContext)

    return (
        <LoginSocialFacebook
            appId='580986570871624'
            onResolve={ async (response) => {
                setLoading(true)
                var userObject =  response.data
                var user = {
                    username: userObject.email,
                    password: '123456',
                    fullname: userObject.name,
                    avatar: userObject.picture.data.url,
                    role: 'USER',
                    signinWith: 'indirect'
                }
                try {
                    await loginWithGoogle(user)
                } catch (error) {
                    console.log(error)
                }
                setLoading(false)
            }}
            onReject={(error) => {
                console.log(error)
            }}
        >
            <FacebookLoginButton style={{ height: '38px', fontSize: '15px', marginTop: '1px' }}></FacebookLoginButton>
        </LoginSocialFacebook>
    );
};

export default LoginFacebook;