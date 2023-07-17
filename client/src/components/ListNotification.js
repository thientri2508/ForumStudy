import React, { useEffect, useState } from 'react';
import ItemListNotification from './ItemListNotification';
import { apiUrl } from '../contexts/constants'

const ListNotification = ({style, user, socket, toggleNotification}) => {

    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        getNotification();
        socket.on("updateNotification", (notification) => {
            getNotification()
        });
    }, [])

    const getNotification = () => {
        fetch(`${apiUrl}/notifications/${user._id}`)
        .then(response => response.json())
        .then(data => setNotifications(data.notifications))
        .catch(err => console.log(err))
    }

    return (
        <div className='list-notification' style={style}>
            <h2 style={{margin: '0 0 10px 8px'}}>Notification</h2>
            { notifications.map(notification => (
                <ItemListNotification key={notification._id} notification={notification} toggleNotification={toggleNotification}></ItemListNotification>
            )) }
        </div>
    );
};

export default ListNotification;