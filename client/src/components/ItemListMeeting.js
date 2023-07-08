import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'

const ItemListMeeting = ({room}) => {

    const {
		authState: { isAuthenticated }
	} = useContext(AuthContext)
    
    const JoinRoom = (id) => {
        if(isAuthenticated) window.open(`/meeting/room/${id}`)
        else return window.location.href = "/auth";
    }

    let avatar = (<FontAwesomeIcon icon={faCircleUser} size='2xl' />)
    if(room.user.avatar) {
        avatar = (<img src={room.user.avatar} className='avatar2' ></img>)
    }
    return (
        <li className='item-topic' style={{height: '435px'}}>
            <div className='meeting-header'>
                <button className='btn-joinRoom' onClick={() => JoinRoom(room._id)}>Join Now</button>
                <img src={ require(`../image/meeting.jpg`) } className='img-meeting' ></img>
            </div>
            <div className='title-topic'>
                <p className='title-topic-text'>{room.name}</p>
                <p>Follow</p>
            </div>
            <ul className='meeting-author'>
                <li>{avatar}</li>
                <li style={{fontSize: '16px'}}>{room.user.fullname}</li>
            </ul>
            <ul className='metting-time'>
                <li>
                    <ul className='metting-clock'>
                        <img src={ require(`../image/calendar.png`) }></img>
                        <li>{room.date}</li>
                    </ul>
                </li>
                <li>
                    <ul className='metting-clock'>
                        <img src={ require(`../image/clock.png`) }></img>
                        <li>{room.time}</li>
                    </ul>
                </li>
            </ul>
        </li>
    );
};

export default ItemListMeeting;