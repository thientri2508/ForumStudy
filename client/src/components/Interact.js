import React from 'react';
import { LikeContext } from '../contexts/LikeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare, faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'

const Interact = ({userId, postId}) => {

    const {
		likeState: { likes },
        addLike,
        deleteLike
	} = useContext(LikeContext)

    var like
    
    const check = () => {
        for(let i=0 ; i<likes.length ; i++){
            if(likes[i].user==userId && likes[i].post==postId) {
                like = likes[i]
                return true
            }
        }
        return false
    } 

    var checkLike = check()

    const Like = async postId => {
        try {
			const likeData = await addLike(postId)
            // socket.emit("liked", likeData)
		} catch (error) {
			console.log(error)
		}
    }

    const disLike = async idLike => {
        try {
			const likeData = await deleteLike(idLike)
            // socket.emit("liked", likeData)
		} catch (error) {
			console.log(error)
		}
    }

    if(checkLike){
        return (
            <ul className='post-detail-interact'>
                <li style={{color : "blue"}} onClick={() => {disLike(like._id)}}><FontAwesomeIcon icon={faThumbsUp} />&nbsp;&nbsp;Like</li>
                <li><FontAwesomeIcon icon={faComment} />&nbsp;&nbsp;Comment</li>
                <li><FontAwesomeIcon icon={faShare} />&nbsp;&nbsp;Share</li>
            </ul>
        )
    } else {
        return (
            <ul className='post-detail-interact'>
                <li onClick={() => {Like(postId)}}><FontAwesomeIcon icon={faThumbsUp} />&nbsp;&nbsp;Like</li>
                <li><FontAwesomeIcon icon={faComment} />&nbsp;&nbsp;Comment</li>
                <li><FontAwesomeIcon icon={faShare} />&nbsp;&nbsp;Share</li>
            </ul>
        )
    }
};

export default Interact;