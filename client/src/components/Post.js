import React from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faEllipsisVertical, faSliders, faDeleteLeft, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from 'react'
import { PostContext } from '../contexts/PostContext'
import { CommentContext } from '../contexts/CommentContext'
import { AuthContext } from '../contexts/AuthContext'
import { LikeContext } from '../contexts/LikeContext'
import Loader from './Loader';
import ListComment from './ListComment';
import Interact from './Interact';
import io from 'socket.io-client';

const Post = () => {

    const socket = io('http://localhost:4000');
    socket.on("connect", () => {
        console.log("connected")
    })
    
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
		authState: { isAuthenticated, user }
	} = useContext(AuthContext)

    const [comment, setComment] = useState("")

    const handleChange = (event) => {
        setComment(event.target.value)
    };

    const sendComment = async () => {
        if(!isAuthenticated) {
            return window.location.href = "/auth";
        }
		try {
            const newComment = { content: comment, post: post._id }
			const commentData = await addComment(newComment)
            socket.emit("commented", commentData)
            setComment("")
		} catch (error) {
			console.log(error)
		}
	}

    const params = useParams()
    const postId = params.postId

    useEffect(() => {
        getPostById(postId);
        getLikes(postId);
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

    if (postsLoading) {
		body = (
			<Loader></Loader>
		)
	} else if (post == null) {
        return window.location.href = "/all-posts";
    } else {
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

		body = (
            <div className='container'>
                <div className='post-detail'>
                   <div className='back' onClick={fnBack} style={{marginTop: "-25px", marginBottom: "10px", marginLeft: "-3px"}}>
                        <FontAwesomeIcon icon={faAngleLeft} size='xl' />
                    </div>
                    <ul className='post-detail-wrapper'>
                        <li>
                            <ul className='post-detail-head'>
                                <li><FontAwesomeIcon icon={faCircleUser} size='2xl' /></li>
                                <li>
                                    <ul className='post-detail-infor'>
                                        <li><b>{post.user.username}</b></li>
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
                    <input type="submit" class="btn-comment" value="Publish" onClick={sendComment}></input>

                    <ListComment postId={postId} socket={socket}></ListComment>
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