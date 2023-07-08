import React from 'react';
import { RoomContext } from '../contexts/RoomContext'
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect } from 'react'
import ItemListMeeting from './ItemListMeeting';
import Loader from '../components/Loader'

const ListMeeting = () => {

    const {
		roomState: { rooms, roomsLoading },
		getRooms
	} = useContext(RoomContext)

    const {
		authState: { isAuthenticated, user }
	} = useContext(AuthContext)

    useEffect(() => {
        getRooms(); 
    }, [])

    let btnAddRoom = (<></>)
    if(isAuthenticated){
        if(user.role == 'ADMIN') btnAddRoom = (<button className='btn-post'>Create New Meeting</button>)
    }

    let body = null

    if (roomsLoading) {
		body = (
			<Loader></Loader>
		)
	} else if (rooms.length === 0) {
		body = (
            <div className='container'>
                <div className='topic'>
                    {btnAddRoom}
                    <img src={ require('../image/inbox.png') } className='imgNoTopic'></img>
                    <h2 className='NoTopic'>There are no topics currently...</h2>	
                </div>
            </div>	
		)
	} else {
        body = (
            <div className='container'>
                <div className='topic'>
                    {btnAddRoom}
                    <ul className='list-topic'>
                    {rooms.map(room => (
                        <ItemListMeeting key={room._id} room={room}></ItemListMeeting>
                    ))}
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <>{body}</>
    );
};

export default ListMeeting;