import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faComment, faCircleUser, faCircleDot } from '@fortawesome/free-solid-svg-icons'
import { apiUrl } from '../contexts/constants'

const ItemListPostMobile = ({ post: { _id, content, createdAt, user, file } }) => {

    var t = createdAt.split('T')[0]
    var date = t.split("-")

    var amountFile = file.split("/").length-1

    const [comments, setComments] = useState(null)
    const [likes, setLikes] = useState(null)

    useEffect(() => {
        fetch(`${apiUrl}/comments/amount/${_id}`)
        .then(response => response.json())
        .then(data => setComments(data.comments))
        .catch(err => console.log(err))

        fetch(`${apiUrl}/likes/amount/${_id}`)
        .then(response => response.json())
        .then(data => setLikes(data.likes))
        .catch(err => console.log(err))
    }, [])

    let avatar = (
        <ul className='author'>
            <li><FontAwesomeIcon icon={faCircleUser} size='xl' /></li>
            <li>{user.fullname}</li>
        </ul>
    )
    if(user.avatar) {
        avatar = (
            <ul className='author'>
                <li><img src={user.avatar} className='avatar1' ></img></li>
                <li>{user.fullname}</li>
            </ul>
        )
    }

    return (
        <div className='postMobile'>
            <ul className='postMobile-infor'>
                <li>{avatar}</li>
                <li><FontAwesomeIcon icon={faCircleDot} size="2xs" />&nbsp;&nbsp;{date.reverse().join("-")}</li>
            </ul>
            <a href={`/post/${_id}`}><h3 className='postMobile-title'>{content}</h3></a>
            <div style={{marginTop: '20px'}}><img src={ require('../image/image-gallery.png') }></img>&nbsp;&nbsp;{amountFile}</div>
            <ul className='postMobile-interact-view'>
                <li>
                    <ul className='like'>
                        <li><FontAwesomeIcon icon={faThumbsUp} size='lg' /></li>
                        <li>{ likes ? likes : "0" }</li>
                    </ul> 
                </li>
                <li>
                    <ul className='comment'>
                        <li><FontAwesomeIcon icon={faComment} size='lg' /></li>
                        <li>{ comments ? comments : "0" }</li>
                    </ul> 
                </li>
            </ul>
            {/* <ul className='btn-interact'>
                <li><FontAwesomeIcon icon={faThumbsUp} size='lg' />&nbsp;&nbsp;Like</li>
                <li><FontAwesomeIcon icon={faComment} size='lg' />&nbsp;&nbsp;Comment</li>
            </ul> */}
        </div>
    );
};

export default ItemListPostMobile;