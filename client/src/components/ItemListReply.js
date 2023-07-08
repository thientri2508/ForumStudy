import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faEraser } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../contexts/AuthContext'
import { ReplyContext } from '../contexts/ReplyContext'
import {apiUrl} from '../contexts/constants'

const ItemListReply = ({reply, socket}) => {
    var createdAt = reply.createdAt.split('T')[0]
    var date = createdAt.split("-")

    const {
		authState: { isAuthenticated, user }
	} = useContext(AuthContext)

    const { deleteReply } = useContext(ReplyContext)

    let del

    if(isAuthenticated){
        if(reply.user._id == user._id) {
            del = (
                <li onClick={() => {DeteleReply(reply._id)}}><FontAwesomeIcon icon={faEraser} size='lg'/></li>
            )
        }
    }

    const DeteleReply = async replyId => {
        try {
			const DeteleReply = await deleteReply(replyId)
            socket.emit("reply", "replyData")
		} catch (error) {
			console.log(error)
		}
    }

    let avatar = (<FontAwesomeIcon icon={faCircleUser} size='2xl'/>)
        if(reply.user.avatar) {
            avatar = (<img src={reply.user.avatar} className='avatar1' ></img>)
        }

    return (
        <div className='list-comment-item' id={`itemReply-${reply._id}`} style={{marginLeft: '55px', marginTop: '5px', position: 'relative'}}>
            <div className='curve' id={`curve-${reply._id}`}></div>
            <ul className='post-detail-wrapper' style={{marginBottom : "0px"}}>
                <li>
                    <ul className='post-detail-head'>
                        <li>{avatar}</li>
                        <li>
                            <ul className='post-detail-infor'>
                                <li><b>{reply.user.fullname}</b></li>
                                <li style={{fontSize: '12px'}}><i>{date.reverse().join("-")}</i></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                {del}
            </ul>
            <div className='content-comment'>{reply.content}</div>
        </div>
    );
};

export default ItemListReply;