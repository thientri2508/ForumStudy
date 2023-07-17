import React, { useEffect, useState } from 'react';
import { apiUrl } from '../contexts/constants'

const CountNotification = ({user, socket}) => {

    const [num, setNum] = useState(0)

    useEffect(() => {
        getAmountNotification();
        socket.on("updateNotification", (notification) => {
            getAmountNotification()
        });
    }, [])

    const getAmountNotification = () => {
        fetch(`${apiUrl}/notifications/amount/${user._id}`)
        .then(response => response.json())
        .then(data => setNum(data.notifications))
        .catch(err => console.log(err))
    }

    let body = (<></>)
    if(num != 0) body = (<span className='num-notification'>{num}</span>)
    else if(num > 9) body = (<span className='num-notification'>9+</span>)

    return ( 
        <>
            {body}
        </>
    );
};

export default CountNotification;