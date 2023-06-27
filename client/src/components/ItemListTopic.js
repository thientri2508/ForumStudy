import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faSignsPost } from '@fortawesome/free-solid-svg-icons'

const ItemListTopic = ({topic}) => {
    if(topic.title!="No Topic") {
        return (
            <li className='item-topic'>
                <img src={ require(`../image/${topic.image}`) } className='img-topic' ></img>
                <div className='title-topic'>
                    <a href={`/topic/${topic._id}`} ><p className='title-topic-text'>{topic.title}</p></a>
                    <p>Follow</p>
                </div>
                <div className='interact-topic'>
                    <FontAwesomeIcon icon={faEye} size='lg' style={{marginRight: "23px"}} />
                    <FontAwesomeIcon icon={faSignsPost} size='lg' style={{marginRight: "8px"}} />
                    <span>3</span>
                </div>
                <div className='description-topic'>
                    {topic.description}
                </div>
            </li>
        );
    }
};

export default ItemListTopic;