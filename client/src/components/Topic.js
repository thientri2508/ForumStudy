import React from 'react';
import ItemListTopic from './ItemListTopic';
import { TopicContext } from '../contexts/TopicContext'
import { PostContext } from '../contexts/PostContext'
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect } from 'react'
import Loader from '../components/Loader'

const Topic = () => {

    const {
		setShowAddPostModal
	} = useContext(PostContext)

    const {
		topicState: { topic, topics, topicsLoading },
		getTopics
	} = useContext(TopicContext)

    const {
		authState: { isAuthenticated }
	} = useContext(AuthContext)

    useEffect(() => {getTopics();}, [])

    const AddPost =  () => {
        if(!isAuthenticated) {
            return window.location.href = "/auth";
        } else{
            setShowAddPostModal(true)
        }
    }


	let body = null

    if (topicsLoading) {
		body = (
			<Loader></Loader>
		)
	} else if (topics.length === 0) {
        document.getElementById("Topics").style.color="#C38077"
        document.getElementById("Topics").style.fontSize="22px"
		body = (
            <div className='container'>
                <div className='topic'>
                    <button className='btn-post' onClick={AddPost}>Create New Post</button>
                    <ul className='list-topic' style={{height: "500px"}}>
                        <h1>Not Topic</h1>
                    </ul>
                </div>
            </div>	
		)
	} else {
        document.getElementById("Topics").style.color="#C38077"
        document.getElementById("Topics").style.fontSize="22px"
		body = (
            <div className='container'>
                <div className='topic'>
                    <button className='btn-post' onClick={AddPost}>Create New Post</button>
                    <ul className='list-topic'>
                    {topics.map(topic => (
                        <ItemListTopic key={topic._id} topic={topic}></ItemListTopic>
                    ))}
                    </ul>
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

export default Topic;