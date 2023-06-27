import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faComment, faCircleUser, faCircleDot } from '@fortawesome/free-solid-svg-icons'

const ItemListPostMobile = ({ post: { _id, content, createdAt, user, topic } }) => {
    return (
        <div className='postMobile'>
            <ul className='postMobile-infor'>
                <li><FontAwesomeIcon icon={faCircleUser} />&nbsp;&nbsp;{user.username}</li>
                <li><FontAwesomeIcon icon={faCircleDot} size="2xs" />&nbsp;&nbsp;{createdAt.split('T')[0]}</li>
            </ul>
            <a href={`/post/${_id}`}><h3 className='postMobile-title'>{content}</h3></a>
            <ul className='postMobile-interact-view'>
                <li>
                    <ul className='like'>
                        <li><FontAwesomeIcon icon={faThumbsUp} size='lg' /></li>
                        <li>0</li>
                    </ul> 
                </li>
                <li>
                    <ul className='comment'>
                        <li><FontAwesomeIcon icon={faComment} size='lg' /></li>
                        <li>0</li>
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