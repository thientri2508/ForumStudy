import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faEraser } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../contexts/AuthContext'
import { CommentContext } from '../contexts/CommentContext'
import { useContext, } from 'react'

const ItemListComment = ({comment, socket}) => {
    const {
		authState: { isAuthenticated, user }
	} = useContext(AuthContext)

    const { deleteComment } = useContext(CommentContext)

    const DeteleComment = async commentId => {
        try {
			const DeteleComment = await deleteComment(commentId)
            socket.emit("commented", "DeteleComment")
		} catch (error) {
			console.log(error)
		}
    }

    var createdAt = comment.createdAt.split('T')[0]
    var date = createdAt.split("-")

    let del

    if(isAuthenticated){
        if(comment.user._id == user._id) {
            del = (
                <li onClick={() => {DeteleComment(comment._id)}}><FontAwesomeIcon icon={faEraser} size='lg'/></li>
            )
        }
    }

    return (
        <div className='list-comment-item'>
            <ul className='post-detail-wrapper' style={{marginBottom : "0px"}}>
                <li>
                    <ul className='post-detail-head'>
                        <li><FontAwesomeIcon icon={faCircleUser} size='2xl' /></li>
                        <li>
                            <ul className='post-detail-infor'>
                                <li><b>{comment.user.username}</b></li>
                                <li><i>{date.reverse().join("-")}</i></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                {del}
            </ul>
            <div className='content-comment'>{comment.content}</div>
        </div>
    );
};

export default ItemListComment;