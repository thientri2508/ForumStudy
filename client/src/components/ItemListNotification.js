import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

const ItemListNotification = ({notification, toggleNotification}) => {

    let seen = (<li className='check-notification' style={{opacity: '0'}}></li>)
    if(notification.status == 'not seen') seen = (<li className='check-notification'></li>)

    const seenNotification = async (idPost) => {
        await toggleNotification()
        return window.location.href = `/post/${idPost}`;
    }

    let avatar = (<FontAwesomeIcon icon={faCircleUser} size='2xl'/>)
    if(notification.sender.avatar) {
        avatar = (<img src={notification.sender.avatar} className='avatar1' ></img>)
    }

    return (
        <ul className='item-list-notification' onClick={() => {seenNotification(notification.post)}}>
            <li>{avatar}</li>
            <li>
                <ul>
                    <li>{notification.sender.fullname} {notification.message}</li>
                    <li style={{marginTop: '6px'}}>{notification.date}</li>
                </ul>
            </li>
            {seen}
        </ul>
    );
};

export default ItemListNotification;