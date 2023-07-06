import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDot, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { apiUrl } from '../contexts/constants'

const ItemListPost = ({ post: { _id, content, createdAt, user, topic, file } }) => {
    
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
                <li><img src={`${apiUrl }/upload/file/${user.avatar}`} className='avatar1' ></img></li>
                <li>{user.fullname}</li>
            </ul>
        )
    }

    return (
        <div className='item-listPost'> 
            <div className='post-left'>
                <a href={`/post/${_id}`}><h3 className='title-post'>{content}</h3></a>
                <div style={{marginTop: '12px'}}><img src={ require('../image/image-gallery.png') }></img>&nbsp;&nbsp;{amountFile}</div>
                <ul className='post-infor'>
                    <li>{avatar}</li>
                    <li><FontAwesomeIcon icon={faCircleDot} size="2xs" />&nbsp;&nbsp;{topic.title}</li>
                </ul>
            </div>
                <ul className='post-right'>
                    <li className='showLike'>{ likes ? likes : "0" }</li>
                    <li className='showComment'>{ comments ? comments : "0" }</li>
                    <li style={{paddingLeft: '8px'}}>{date.reverse().join("-")}</li>
                </ul>
        </div>
    );
};

export default ItemListPost;