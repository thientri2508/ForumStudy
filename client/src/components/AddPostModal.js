import React from 'react';
import { useContext, useState, useEffect } from 'react'
import { PostContext } from '../contexts/PostContext'
import { AuthContext } from '../contexts/AuthContext'
import { TopicContext } from '../contexts/TopicContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import DropdownSelect from './DropdownSelect';

const AddPostModal = () => {

    //const [content, setContent] = useState("")

    const [PostForm, setPostForm] = useState({
		topic: '6499812b9081baefa9569aec',
		content: ''
	})

    const { content } = PostForm

    const handleChangeContent = (event) => {
        setPostForm({...PostForm, content: event.target.value})
        if(event.target.value != "") {
            document.getElementById("btn-post-submit-none").style.display='none'
        } else{
            document.getElementById("btn-post-submit-none").style.display='block'
        }
    };

    const handleChangeTopic = (value) => {
        setPostForm({...PostForm, topic: value})
        // console.log(value)
    };


    const {
		authState: { isAuthenticated, user }
	} = useContext(AuthContext)

    var name = "username"
    if(isAuthenticated){
        name = user.username
    }

    const {
		topicState: { topics, topicsLoading },
		getTopics
	} = useContext(TopicContext)

    useEffect(() => {getTopics();}, [])

    var Topicoptions = [ { value: '6499812b9081baefa9569aec', label: 'No Topic' } ]
    if(!topicsLoading) {
        
        for(let i=0 ; i<topics.length-1 ; i++){
            var Topicoption = { value: topics[i]._id, label: topics[i].title}
            Topicoptions.push(Topicoption)
        }
    }

    const {
		showAddPostModal,
		setShowAddPostModal,
        addPost
	} = useContext(PostContext)

    var style
    if(showAddPostModal){
        style = { display: 'block'}
    } else {
        style = { display: 'none'}
    }

    const CloseCreatePost =  () => {
        setPostForm({...PostForm, content: ""})
        document.getElementById("btn-post-submit-none").style.display='block'
        setShowAddPostModal(false)
    }

    const post = async event => {
		event.preventDefault()

		try {
			const { success, message } = await addPost(PostForm)
            CloseCreatePost()
		} catch (error) {
			console.log(error)
		}
	}

    return (
        <div className='bg-loading' style={style}>
            <div className='AddPostModal'>
                <form onSubmit={post}>
                <h3 className='create-post'>Create Post</h3>
                <div className='close-AddPostModal' onClick={CloseCreatePost}><FontAwesomeIcon icon={faXmark} size='xl' /></div>
                <ul className='AddPostModal-head'>
                    <li><FontAwesomeIcon icon={faCircleUser} style={{ fontSize: "42px"}} /></li>
                    <li>
                        <ul>
                            <li className='AddPostModal-author'>{name}</li>
                            <li style={{marginTop: '5px'}}><DropdownSelect options={Topicoptions} onChange={handleChangeTopic}></DropdownSelect></li>
                        </ul>
                    </li>
                </ul>
                
                    <div className='AddPostModal-form'>
                        <textarea class="input-title" placeholder="Write contents..." value={content} onChange={handleChangeContent}></textarea>
                    </div>
                    <div className='AddIcon'>
                        <h3>Add to your post</h3>
                        <ul className='ChooseOption'>
                            <li><img src={ require('../image/picture.png') }></img></li>
                            <li><img src={ require('../image/happiness.png') }></img></li>
                            <li><img src={ require('../image/gif.png') }></img></li>
                        </ul>
                    </div>
                    <div className='btn-post-submit'>
                        <button>Post</button>
                        <div id='btn-post-submit-none'>Post</div>
                    </div>
                    
                </form>
            </div>
        </div>
    );
};

export default AddPostModal;