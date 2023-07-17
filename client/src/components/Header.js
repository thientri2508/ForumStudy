import React, { useState, useEffect } from 'react';
import './style.css';
import logoIcon from '../image/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faRightFromBracket, faBell } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import EditProfile from './EditProfile';
import ListNotification from './ListNotification';
import CountNotification from './CountNotification';
import axios from 'axios'
import { apiUrl } from '../contexts/constants'
import io from 'socket.io-client';

const socket = io('http://localhost:5000');
    socket.on("connect", () => {
    })

const Header = () => {
    const navigate = useNavigate()

    const [showNotification, setShowNotification] = useState(false)

    const {
		authState: { authLoading, isAuthenticated, user },
		logoutUser,
        setShowEditProfile
	} = useContext(AuthContext)

    const logout = () => logoutUser()

    const OpenEditProfile =  () => {
        setShowEditProfile(true)
        document.documentElement.style.overflow = 'hidden';
    }

    const toggleNotification = async () => {
        if(!showNotification) setShowNotification(!showNotification)
        else {
            setShowNotification(!showNotification)
            try {
                await axios.put(`${apiUrl}/notifications`)
                socket.emit("notification", "notificationData")
            } catch (error) {
                console.log(error)
            }
        }
    }

    var style
    if(showNotification){
        style = { display: 'block'}
    } else {
        style = { display: 'none'}
    }

    let body

	if (authLoading)
		body = (
        <Loader></Loader>
		)
	else if (isAuthenticated) {
        let avatar = (<FontAwesomeIcon icon={faCircleUser} size="2xl" />)
        if(user.avatar){
            avatar = (<img src={user.avatar} className='avatar' ></img>)
        }

        body = (<>
			<div className='header'>
                <a href='/'><img src={logoIcon} className='logo'></img></a>
                <input type='checkbox' id='toggler'></input>
                <label for='toggler'><i class="fa-solid fa-bars fa-2xl"></i></label>
                <div className='menu'>
                    <ul className='list'>
                        <li className='menu-list-item' onClick={() => navigate('/')}>Forum</li>
                        <li className='menu-list-item'>Members</li>
                        <li className='menu-list-item' onClick={() => navigate('/meeting')} id='nomeeting'>Meeting</li>
                        <li className='menu-list-item' onClick={OpenEditProfile}>{avatar}</li>
                        <li className='notification' onClick={toggleNotification}>
                            <FontAwesomeIcon icon={faBell} size="xl" />
                            <CountNotification user={user} socket={socket}></CountNotification>
                        </li>
                        <li className='logout' onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} size="xl" /></li>
                        <li className='menu-list-item'>
                            <ul className='share'>
                                <li><i class="fa-brands fa-facebook-f fa-xl"></i></li>
                                <li><i class="fa-brands fa-pinterest-p fa-xl"></i></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <ListNotification style={style} user={user} socket={socket} toggleNotification={toggleNotification}></ListNotification>
            </div>
            <EditProfile user={user}></EditProfile>
            </>
		)
    }
	else{
        body = (
			<div className='header'>
                <img src={logoIcon} className='logo'></img>
                <input type='checkbox' id='toggler'></input>
                <label for='toggler'><i class="fa-solid fa-bars fa-2xl"></i></label>
                <div className='menu'>
                    <ul className='list'>
                        <li className='menu-list-item' onClick={() => navigate('/')}>Forum</li>
                        <li className='menu-list-item'>Members</li>
                        <li className='menu-list-item' onClick={() => navigate('/meeting')} id='nomeeting'>Meeting</li>
                        <a href='/auth'><li className='menu-list-item'>Log In</li></a>
                        <li className='menu-list-item'>
                            <ul className='share'>
                                <li><i class="fa-brands fa-facebook-f fa-xl"></i></li>
                                <li><i class="fa-brands fa-pinterest-p fa-xl"></i></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
	    )
    }
		

    return (
        <>
            {body}
        </>
    );
};

export default Header;