import React from 'react';
import { useContext, useState, useEffect } from 'react'
import { PostContext } from '../contexts/PostContext'
import { AuthContext } from '../contexts/AuthContext'
import { TopicContext } from '../contexts/TopicContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import DropdownSelect from './DropdownSelect';
import ImageUpload from './ImageUpload';
import axios from 'axios'
import { apiUrl } from '../contexts/constants'

const AddPostModal = () => {

    const [loading, setLoading] = useState(false)

    const [ToggleFile, setToggleFile] = useState(false)

    const [PostForm, setPostForm] = useState({
		topic: '6499812b9081baefa9569aec',
		content: '',
        file: ''
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
    };


    const {
		authState: { isAuthenticated, user }
	} = useContext(AuthContext)

    var name = "username"
    var avatar = (<FontAwesomeIcon icon={faCircleUser} style={{ fontSize: "42px"}} />)
    if(isAuthenticated){
        name = user.fullname
        if(user.avatar) {
            avatar = (<img src={user.avatar} className='avatar' ></img>)
        }
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
        setPostForm({...PostForm, file: ""})
        document.getElementById("btn-post-submit-none").style.display='block'
        setOff()
        setSelectedImages([]);
        setSelectedVideos([]);
        setSelectedFiles([]);
        setShowAddPostModal(false)
        document.documentElement.style.overflow = 'auto';
    }

    const toggleInputFile = () => {
        if(!ToggleFile) {
            document.getElementById("input-file").style.display='block'
            document.getElementById("AddPostModal-form").style.height='310px'
            document.getElementById("AddPostModal-form").style.overflowY='auto'
            document.getElementById("input-title").style.height='65px'
            document.getElementById("AddPostModal").style.height='590px'
            document.getElementById("AddPostModal").style.top='70px'
            document.getElementById("selectFile").classList.add('disabled');
            document.getElementById("input-title").style.fontSize='16px'
            setToggleFile(true)
        }
    }

    const setOff = () => {
        document.getElementById("input-file").style.display='none'
        document.getElementById("AddPostModal-form").style.height='auto'
        document.getElementById("AddPostModal-form").style.overflowY='visible'
        document.getElementById("input-title").style.height='150px'
        document.getElementById("AddPostModal").style.height='430px'
        document.getElementById("AddPostModal").style.top='158px'
        document.getElementById("selectFile").classList.remove('disabled');
        document.getElementById("input-title").style.fontSize='25px'
        setToggleFile(false)
    }

    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedVideos, setSelectedVideos] = useState([]);

    const handleClearImages = () => {
        setSelectedImages([]);
        setSelectedVideos([]);
        setSelectedFiles([]);
        setPostForm({...PostForm, file: ""})
    };

    const [selectedFiles, setSelectedFiles] = useState([]);

    const post = async (event) => {
        event.preventDefault()
        setLoading(true)

        try {
			await addPost(PostForm)  
		} catch (error) {
			console.log(error)
		}
        
        for(let i=0 ; i<selectedFiles.length ; i++){
            const formData = new FormData()
            formData.set("avatar", selectedFiles[i])
            try {
                await axios.post(`${apiUrl}/upload`, formData)
            } catch (error) {
                console.log(error)
            }
        }

        setLoading(false)
        CloseCreatePost()
    }

    return (
        <div className='bg-loading' style={style}> 
            <div id='AddPostModal'>
                { loading ? (<div className='LoadingAddPost'><div class="loader"></div></div>) : (<></>) }
                <form onSubmit={post}>
                <h3 className='create-post'>Create Post</h3>
                <div className='close-AddPostModal' onClick={CloseCreatePost}><FontAwesomeIcon icon={faXmark} size='xl' /></div>
                <ul className='AddPostModal-head'>
                    <li>{avatar}</li>
                    <li>
                        <ul>
                            <li className='AddPostModal-author'>{name}</li>
                            <li style={{marginTop: '5px', zIndex: '20', position: 'relative'}}><DropdownSelect options={Topicoptions} onChange={handleChangeTopic}></DropdownSelect></li>
                        </ul>
                    </li>
                </ul>
                
                    <div id='AddPostModal-form'> 
                        <textarea id="input-title" placeholder="Write contents..." value={content} onChange={handleChangeContent}></textarea>
                        <div id='input-file'>
                            <ImageUpload setLoading={setLoading} setPostForm={setPostForm} PostForm={PostForm} selectedImages={selectedImages} setSelectedImages={setSelectedImages} selectedVideos={selectedVideos} setSelectedVideos={setSelectedVideos} handleClearImages={handleClearImages} setOff={setOff} setSelectedFiles={setSelectedFiles} />
                            {/* <div onClick={handleClearImages}>Clear Images</div> */}
                        </div>
                    </div>
                    <div className='AddIcon'>
                        <h3>Add to your post</h3>
                        <ul className='ChooseOption'>
                            <li onClick={toggleInputFile} id='selectFile'><img src={ require('../image/picture.png') }></img></li>
                            <li id='selectIcon'><img src={ require('../image/happiness.png') }></img></li>
                            <li id='selectGif'><img src={ require('../image/gif.png') }></img></li>
                        </ul>
                    </div>
                    <div className='btn-post-submit'>
                        <button type='submit'>Post</button>
                        <div id='btn-post-submit-none'>Post</div>
                    </div>
                    
                </form>
            </div>
        </div>
    );
};

export default AddPostModal;