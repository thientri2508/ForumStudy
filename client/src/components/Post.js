import React from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faEllipsisVertical, faSliders, faDeleteLeft, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from 'react'
import { PostContext } from '../contexts/PostContext'
import { CommentContext } from '../contexts/CommentContext'
import { ReplyContext } from '../contexts/ReplyContext';
import { AuthContext } from '../contexts/AuthContext'
import { LikeContext } from '../contexts/LikeContext'
import Loader from './Loader';
import ListComment from './ListComment';
import Interact from './Interact';
import io from 'socket.io-client';
import {apiUrl} from '../contexts/constants'
import axios from 'axios'

const socket = io('http://localhost:5000');
    socket.on("connect", () => {
        console.log("connected")
    })

const Post = () => {
    
    const [popup, setPopup] = useState(false)

    const {
		postState: { post, postsLoading },
		getPostById,
        deletePost
	} = useContext(PostContext)

    const { addComment } = useContext(CommentContext)

    const {
		likeState: { likes, likesLoading },
		getLikes
	} = useContext(LikeContext)

    const {
		replyState: { replies, repliesLoading },
		getReplies
	} = useContext(ReplyContext)

    const {
		authState: { isAuthenticated, user }
	} = useContext(AuthContext)

    const [comment, setComment] = useState("")

    const handleChange = (event) => {
        setComment(event.target.value)
    };

    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();

        return `${hours}h:${minutes}m ${day}-${month}-${year}`;
    }

    const sendComment = async (idReceiver) => {
        if(!isAuthenticated) {
            return window.location.href = "/auth";
        }
		try {
            const newComment = { content: comment, post: post._id }
			await addComment(newComment)
            socket.emit("commented", "commentData")
            setComment("")
            if(user._id != idReceiver) {
                const newNotification = { receiver: idReceiver, post: postId, message: ' commented on one of your posts', date: getCurrentDate(), status: 'not seen'}
                await axios.post(`${apiUrl}/notifications`, newNotification)
                socket.emit("notification", "notificationData")
            }
		} catch (error) {
			console.log(error)
		}
	}

    const params = useParams()
    const postId = params.postId

    useEffect(() => {
        getPostById(postId);
        getLikes(postId);
        getReplies(postId);
        socket.on("updateReply", (comment) => {
            getReplies(postId)
            console.log("newReply")
        });
    }, [])

    // socket.on("updateLike", (like) => {
    //     getLikes(postId)
    // })

    const togglePopup = () => {
        if(popup){
            document.getElementById("popup-setting").style.display="none"
            setPopup(false)
        }else{
            document.getElementById("popup-setting").style.display="block"
            setPopup(true)
        }
    }

    const fnDeletePost = async () => {
        try {
			await deletePost(postId)
            return window.location.href = "/all-posts"
            // socket.emit("commented", DeteleComment)
		} catch (error) {
			console.log(error)
		}
    }

    let amoutLike = (<li></li>)

    if(!likesLoading){
        amoutLike = (
            <li>{likes.length} Like</li>
        )
    }

    const fnBack = () => {
        return window.history.back()
    }

    let body = null
    let avatar = (<FontAwesomeIcon icon={faCircleUser} size='2xl' />)

    if (postsLoading || repliesLoading) {
		body = (
			<Loader></Loader>
		)
	} else if (post == null) {
        return window.location.href = "/all-posts";
    } else {
        if(post.user.avatar) {
            avatar = (<img src={post.user.avatar} className='avatar2' ></img>)
        }

        document.getElementById("bannerTop").style.display='none';
        var createdAt = post.createdAt.split('T')[0];
        var date = createdAt.split("-");

        let setting = null
        let interact = (<ul className='post-detail-interact'></ul>)

        if(isAuthenticated){
            if(post.user._id == user._id) {
                setting = (
                    <li onClick={togglePopup}><FontAwesomeIcon icon={faEllipsisVertical} size='xl' /></li>
                )
            }

            interact = ( <Interact userId={user._id} postId={postId}></Interact> )
        }

        var listImage = post.file.split("/")
        if(listImage.length == 1) {
            listImage = []
        }else {
            listImage.pop()
        }

		body = (
            <div className='container'>
                <div className='post-detail'>
                   <div className='back' onClick={fnBack} style={{marginTop: "-25px", marginBottom: "10px", marginLeft: "-3px"}}>
                        <FontAwesomeIcon icon={faAngleLeft} size='xl' />
                    </div>
                    <ul className='post-detail-wrapper'>
                        <li>
                            <ul className='post-detail-head'>
                                <li>{avatar}</li>
                                <li>
                                    <ul className='post-detail-infor'>
                                        <li><b>{post.user.fullname}</b></li>
                                        <li><i>{date.reverse().join("-")}</i></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        {setting}
                        <ul id='popup-setting'>
                            <li><FontAwesomeIcon icon={faSliders} />&nbsp;&nbsp;&nbsp;&nbsp;Settings</li>
                            <li onClick={fnDeletePost}><FontAwesomeIcon icon={faDeleteLeft} />&nbsp;&nbsp;&nbsp;&nbsp;Delete</li>
                        </ul>
                    </ul>

                    {/* <h1>{post.title}</h1> */}

                    <p className='post-detail-content'>{post.content}</p>

                    <div className='post-detail-image'>
                        {listImage.map((img, index) => (
                            img.includes('.png') ? (<img src={`${apiUrl }/upload/file/${img}`} key={index}></img>) :
                            (<video src={`${apiUrl }/upload/file/${img}`} key={index} preload="metadata" style={{maxWidth: '100%'}} controls></video>)
                        )
                        )}
                    </div>
                    <ul className='post-detail-interactAmount'>
                        {amoutLike}
                        <li>
                            <ul className='post-detail-amountLikeComment'>
                                <li id='amountComment'></li>
                                <li>10 Share</li>
                            </ul>
                        </li>
                    </ul>
                    
                    {interact}

                    <h3>Comments</h3>
                    <textarea rows={2} value={comment} onChange={handleChange} className='text-comment' placeholder='Write a comments...'></textarea>
                    <input type="submit" className="btn-comment" value="Publish" onClick={() => {sendComment(post.user._id)}}></input>

                    <ListComment postId={postId} socket={socket} replies={replies} post={postId} ></ListComment>
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

export default Post;