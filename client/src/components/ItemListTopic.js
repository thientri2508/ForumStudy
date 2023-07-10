import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faSignsPost } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../contexts/AuthContext'
import { TopicContext } from '../contexts/TopicContext'
import { useContext } from 'react'
import {apiUrl} from '../contexts/constants'

const ItemListTopic = ({topic}) => {

    const {
		authState: { authLoading, isAuthenticated, user }
	} = useContext(AuthContext)

    const { deleteTopic } = useContext(TopicContext)

    const fnDeleteTopic = async (topicId) => {
        try {
			await deleteTopic(topicId)
		} catch (error) {
			console.log(error)
		}
    }

    let element = (<p>Follow</p>)
    if(!authLoading) {
        if(isAuthenticated) {
            if(user.role == 'ADMIN') element = (<p onClick={() => {fnDeleteTopic(topic._id)}}>Delete</p>)
        }
    }

    if(topic.title!="No Topic") {
        return (
            <li className='item-topic'>
                <a href={`/topic/${topic._id}`} ><img src={`${apiUrl }/upload/file/${topic.image}`} className='img-topic' ></img></a>
                <div className='title-topic'>
                    <a href={`/topic/${topic._id}`} ><p className='title-topic-text'>{topic.title}</p></a>
                    {element}
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