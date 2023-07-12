import React from 'react'
import ItemListTopic from './ItemListTopic'
import { TopicContext } from '../contexts/TopicContext'
import { PostContext } from '../contexts/PostContext'
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect } from 'react'
import Loader from '../components/Loader'
import AddTopic from './AddTopic'
import UpdateTopic from './UpdateTopic'

const Topic = () => {

    const {
		setShowAddPostModal
	} = useContext(PostContext)

    const {
		topicState: { topics, topic, topicsLoading },
		getTopics,
        setShowAddTopic
	} = useContext(TopicContext)

    const {
		authState: { authLoading, isAuthenticated, user }
	} = useContext(AuthContext)

    useEffect(() => {getTopics();}, [])

    const AddPost =  () => {
        if(!isAuthenticated) {
            return window.location.href = "/auth";
        } else{
            setShowAddPostModal(true)
            document.documentElement.style.overflow = 'hidden';
        }
    }

    const OpenAddTopic =  () => {
        setShowAddTopic(true)
        document.documentElement.style.overflow = 'hidden';
    }

	let body = null

    if (topicsLoading || authLoading) {
		body = (
			<Loader></Loader>
		)
	} else if (topics.length === 0) {
        var title = document.getElementById("Topics")
        if(title) {
            title.style.color="#C38077"
            title.style.fontSize="22px"
        }
        var titleMobile = document.getElementById("category-menu-mobile")
        if(titleMobile) {
            titleMobile.value = "/topics"
        }

        let btnAddTopic = (<button className='btn-post' style={{float: 'none', opacity: '0', cursor: 'auto', height: '0px'}}></button>)
        if(isAuthenticated) {
            if(user.role == 'ADMIN') btnAddTopic = (<button className='btn-post' style={{float: 'none'}} onClick={OpenAddTopic}>Create New Topic</button>)
        }

		body = (
            <div className='container'>
                <div className='topic'>
                    <div className='topic-btn'>
                        {btnAddTopic}
                        <button className='btn-post' style={{float: 'none'}} onClick={AddPost}>Create New Post</button>
                    </div>
                    <img src={ require('../image/inbox.png') } className='imgNoTopic'></img>
                    <h2 className='NoTopic'>There are no topics currently...</h2>	
                </div>
            </div>	
		)
	} else {
        var title = document.getElementById("Topics")
        if(title) {
            title.style.color="#C38077"
            title.style.fontSize="22px"
        }
        var titleMobile = document.getElementById("category-menu-mobile")
        if(titleMobile) {
            titleMobile.value = "/topics"
        }

        let btnAddTopic = (<button className='btn-post' style={{float: 'none', opacity: '0', cursor: 'auto', height: '0px'}}></button>)
        if(isAuthenticated) {
            if(user.role == 'ADMIN') btnAddTopic = (<button className='btn-post' style={{float: 'none'}} onClick={OpenAddTopic}>Create New Topic</button>)
        }

		body = (
            <div className='container'>
                <div className='topic'>
                    <div className='topic-btn'>
                        {btnAddTopic}
                        <button className='btn-post' style={{float: 'none'}} onClick={AddPost}>Create New Post</button>
                    </div>
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
            <AddTopic></AddTopic>
            {topic !== null && <UpdateTopic />}
            {body}
        </>
    );
};

export default Topic;