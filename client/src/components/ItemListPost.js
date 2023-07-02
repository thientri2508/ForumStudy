import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDot, faCircleUser } from '@fortawesome/free-solid-svg-icons'

const ItemListPost = ({ post: { _id, content, createdAt, user, topic }, comments, likes }) => {
    
    var t = createdAt.split('T')[0]
    var date = t.split("-")

    var amountComment = 0
    comments.map(comment => {
        if(comment.post == _id) amountComment++
    })

    var amoutLike = 0
    likes.map(like => {
        if(like.post == _id) amoutLike++
    })

    return (
        <div className='item-listPost'> 
            <div className='post-left'>
                <a href={`/post/${_id}`}><h3 className='title-post'>{content}</h3></a>
                <ul className='post-infor'>
                    <li><FontAwesomeIcon icon={faCircleUser} />&nbsp;&nbsp;{user.fullname}</li>
                    <li><FontAwesomeIcon icon={faCircleDot} size="2xs" />&nbsp;&nbsp;{topic.title}</li>
                </ul>
            </div>
                <ul className='post-right'>
                    <li className='showLike'>{amoutLike}</li>
                    <li className='showComment'>{amountComment}</li>
                    <li style={{paddingLeft: '8px'}}>{date.reverse().join("-")}</li>
                </ul>
        </div>
    );
};

export default ItemListPost;