import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faEraser } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../contexts/AuthContext'
import { CommentContext } from '../contexts/CommentContext'
import { ReplyContext } from '../contexts/ReplyContext'
import { useContext } from 'react'
import ItemListReply from './ItemListReply';

const ItemListComment = ({comment, socket, replies, post}) => {
    
    var RepliesByComment = []
    replies.forEach(function(reply, index) {
        if(reply.comment == comment._id) RepliesByComment.unshift(reply)
    })

    const {
		authState: { isAuthenticated, user }
	} = useContext(AuthContext)

    const { addReply } = useContext(ReplyContext)

    const { deleteComment } = useContext(CommentContext)

    const [ReplyForm, setReplyForm] = useState({
		content: '',
        post: post,
		comment: comment._id
	})

    const { content } = ReplyForm

    const handleChangeReply = (event) => {
        setReplyForm({...ReplyForm, content: event.target.value})
        if(event.target.value != "") {
            document.getElementById(`sendReply-none-${comment._id}`).style.display='none'
            document.getElementById(`sendReply-${comment._id}`).style.display='block'
        } else{
            document.getElementById(`sendReply-none-${comment._id}`).style.display='block'
            document.getElementById(`sendReply-${comment._id}`).style.display='none'
        }
    };

    const DeteleComment = async commentId => {
        try {
			const DeteleComment = await deleteComment(commentId)
            socket.emit("commented", "DeteleComment")
		} catch (error) {
			console.log(error)
		}
    }

    const openFormReply = () => {
        document.getElementById(`reply-${comment._id}`).style.display='flex'
        var FormReply = document.getElementById(`reply-${comment._id}`)
        var position = FormReply.offsetTop
        window.scrollTo({
            top: position-250,
            behavior: "smooth"
        });
        document.getElementById(`inp-${comment._id}`).focus()
    }

    var createdAt = comment.createdAt.split('T')[0]
    var date = createdAt.split("-")

    let del
    let btnReply

    if(isAuthenticated){
        btnReply = (<h5 className='btn-reply' onClick={openFormReply}>Reply</h5>)
        if(comment.user._id == user._id) {
            del = (
                <li onClick={() => {DeteleComment(comment._id)}}><FontAwesomeIcon icon={faEraser} size='lg'/></li>
            )
        }
    }

    const reply = async (event) => {
        event.preventDefault()
        try {
			const newReply = await addReply(ReplyForm)
            socket.emit("reply", "replyData")
		} catch (error) {
			console.log(error)
		}
        setReplyForm({...ReplyForm, content: ''})
        document.getElementById(`reply-${comment._id}`).style.display='none'
    }

    return (
        <div>
            <div className='list-comment-item' id={`positionComment-${comment._id}`}>
                <ul className='post-detail-wrapper' style={{marginBottom : "0px"}}>
                    <li>
                        <ul className='post-detail-head'>
                            <li><FontAwesomeIcon icon={faCircleUser} size='2xl' /></li>
                            <li>
                                <ul className='post-detail-infor'>
                                    <li><b>{comment.user.fullname}</b></li>
                                    <li style={{fontSize: '12px'}}><i>{date.reverse().join("-")}</i></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    {del}
                </ul>
                <div className='content-comment'>{comment.content}</div>
            </div>

            {btnReply}

            {RepliesByComment.map(reply => (
                <ItemListReply key={reply._id} reply={reply} socket={socket} ></ItemListReply> 
            ))}

            {RepliesByComment.map(reply => {
                var itemReply = document.getElementById(`itemReply-${reply._id}`)
                var itemComment = document.getElementById(`positionComment-${comment._id}`)
                if(itemReply!=null && itemComment!=null) {
                    var positionReply = itemReply.offsetTop
                    var positionComment = itemComment.offsetTop
                    var height = positionReply-positionComment-45
                    document.getElementById(`curve-${reply._id}`).style.height=height+'px'
                    document.getElementById(`curve-${reply._id}`).style.top=(26-height)+'px'
                }
                
            })}

            <form onSubmit={reply}>
            <ul className='reply-form' id={`reply-${comment._id}`}>
                <li><FontAwesomeIcon icon={faCircleUser} size='xl' /></li>
                <li style={{ width: '94%'}}>
                    <div>
                        <textarea className='inp-reply' id={`inp-${comment._id}`} placeholder='Write reply...' value={content} onChange={handleChangeReply}></textarea>
                        <button className='sendReply' id={`sendReply-${comment._id}`}><ion-icon name="send"></ion-icon></button>
                        <div className='sendReply-none' id={`sendReply-none-${comment._id}`}><ion-icon name="send"></ion-icon></div>
                    </div>
                </li>
            </ul>
            </form>
        </div>
    );
};

export default ItemListComment;