import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCircleUser, faPen } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState, useRef, useEffect } from 'react'
import { TopicContext } from '../contexts/TopicContext'
import { AuthContext } from '../contexts/AuthContext'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { apiUrl } from '../contexts/constants'

const UpdateTopic = () => {

    const {
		topicState: { topic },
		showUpdateTopic, 
        setShowUpdateTopic,
        updateTopic
	} = useContext(TopicContext)

    const [loadingTopic, setLoadingTopic] = useState(false)
    const [updatedTopic, setUpdatedTopic] = useState(topic)
    const [OldImage, setOldImage] = useState(null)
    const [FileImageUpdateTopic, setFileImageUpdateTopic] = useState(null)
    const [TopicImageUpdateTopic, setTopicImageUpdateTopic] = useState(null)


    useEffect(() => setOldImage(updatedTopic.image), [])
    useEffect(() => setUpdatedTopic(topic), [topic])

	const { title, description } = updatedTopic

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

    var style
    if(showUpdateTopic){
        style = { display: 'block'}
    } else {
        style = { display: 'none'}
    }

    var btnUpdateTopic = document.getElementById("btn-topic-update-none")
    if(title != "") {
        if(btnUpdateTopic) btnUpdateTopic.style.display='none'
    } else{
        if(btnUpdateTopic) btnUpdateTopic.style.display='block'
    }

    const CloseUpdateTopic =  () => {
        setUpdatedTopic(topic)
        setFileImageUpdateTopic(null)
        setTopicImageUpdateTopic(null)
        setShowUpdateTopic(false)
        document.documentElement.style.overflow = 'auto'
    }

    const onChangeUpdateTopicForm = event =>
        setUpdatedTopic({ ...updatedTopic, [event.target.name]: event.target.value })

    const WIDTH = 700
    const processImage = (image_file) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(image_file);
    
            reader.onload = (event) => {
                const image_url = event.target.result;
                let image = document.createElement('img');
                image.src = image_url;
    
                image.onload = (e) => {
                    let canvas = document.createElement('canvas');
                    let ratio = WIDTH / image.width;
                    canvas.width = WIDTH;
                    canvas.height = image.height * ratio;
    
                    let context = canvas.getContext('2d');
                    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    
                    let new_image_url = canvas.toDataURL('image/jpeg', 98);
                    let name = uuidv4() + '.png';
                    let new_image_file = urlToFile(new_image_url, name);
    
                    resolve(new_image_file);
                };
            };
        });
    };

    let urlToFile = (url, name) => {

        let arr = url.split(",")
        let mime = arr[0].match(/:(.*?);/)[1]
        let data = arr[1]
    
        let dataStr = atob(data)
        let n = dataStr.length
        let dataArr = new Uint8Array(n)
    
        while(n--)
        {
            dataArr[n] = dataStr.charCodeAt(n)
        }
        let file  = new File([dataArr], name, {type: mime})
    
        return file
    }

    async function reduce_image_file_size(base64Str, MAX_WIDTH = 528, MAX_HEIGHT = 528) {
        let resized_base64 = await new Promise((resolve) => {
            let img = new Image()
            img.src = base64Str
            img.onload = () => {
                let canvas = document.createElement('canvas')
                let width = img.width
                let height = img.height
    
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width
                        width = MAX_WIDTH
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height
                        height = MAX_HEIGHT
                    }
                }
                canvas.width = width
                canvas.height = height
                let ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, 0, width, height)
                resolve(canvas.toDataURL()) 
            }
        });
        return resized_base64;
    }
    
    async function image_to_base64(file) {
        let result_base64 = await new Promise((resolve) => {
            let fileReader = new FileReader();
            fileReader.onload = (e) => resolve(fileReader.result);
            fileReader.onerror = (error) => {
                console.log(error)
                alert('An Error occurred please try again, File might be corrupt');
            };
            fileReader.readAsDataURL(file);
        });
        return result_base64;
    }

    const handleImageSelect = async (event) => {
        setLoadingTopic(true)
        const image_file = event.target.files[0]
        if(image_file) {
            const res = await image_to_base64(image_file)
            if (res) {
                const resized = await reduce_image_file_size(res)
                setTopicImageUpdateTopic(resized)
            }
            const new_image_file = await processImage(image_file)
            setFileImageUpdateTopic(new_image_file)
            setUpdatedTopic({ ...updatedTopic, image: new_image_file.name})
        }
        setLoadingTopic(false)
    };

    const fileInputRef = useRef(null);

    const handleOpenFile = () => {
        fileInputRef.current.click();
    };

    const handleClearImages = () => {
        setFileImageUpdateTopic(null);
        setTopicImageUpdateTopic(null);
        setUpdatedTopic({ ...updatedTopic, image: OldImage})
    };

    let componentImg = (
        <>
            <div className='OpenChooseFileTopic1'>
                <div className='OpenChooseFileTopic1-title'>
                    <div><img src={ require('../image/image.png') }></img></div>
                    <h2>Add photo/video</h2>
                    <div>or drag and drop</div>
                </div>
            </div>
            <input type="file" name='avatar' accept='.png, .jpg, .jpeg' id='ChooseTopicImage' onChange={handleImageSelect} ref={fileInputRef}/>
        </>
    )

    if(TopicImageUpdateTopic){
        componentImg = (
            <>
                <input type="file" name='avatar' accept='.png, .jpg, .jpeg' id='ChooseTopicImage' onChange={handleImageSelect} ref={fileInputRef} style={{display : 'none'}} />
                <h4 onClick={handleOpenFile} className='OpenChooseFile2'><FontAwesomeIcon icon={faPen} />&nbsp; Change Image</h4>
                <div id='CloseChooseFileTopic2' onClick={handleClearImages}><FontAwesomeIcon icon={faXmark} size='lg' /></div>
                <img src={TopicImageUpdateTopic} style={{maxWidth: '100%'}} />
            </>
        )
    }

    const SubmitUpdateTopic = async (event) => {
        event.preventDefault()
        setLoadingTopic(true)
        
        if(FileImageUpdateTopic) {
            const formData = new FormData()
            formData.set("avatar", FileImageUpdateTopic)
            try {
                await axios.post(`${apiUrl}/upload`, formData)
            } catch (error) {
                console.log(error)
            }
        }

        try {
			await updateTopic(updatedTopic)  
		} catch (error) {
			console.log(error)
		}

        setLoadingTopic(false)
        setOldImage(updatedTopic.image)
        setFileImageUpdateTopic(null)
        setTopicImageUpdateTopic(null)
        setShowUpdateTopic(false)
        document.documentElement.style.overflow = 'auto'
    }

    return (
        <div className='bg-loading' style={style}>
            <div id='AddTopic'>
                { loadingTopic ? (<div className='LoadingAddPost'><div class="loader"></div></div>) : (<></>) }
                <form onSubmit={SubmitUpdateTopic}>
                <h3 className='create-post'>Edit Topic</h3>
                <div className='close-AddPostModal' onClick={CloseUpdateTopic}><FontAwesomeIcon icon={faXmark} size='xl' /></div>
                <ul className='AddPostModal-head' style={{alignItems: 'center'}}>
                    <li>{avatar}</li>
                    <li>
                        <ul>
                            <li className='AddPostModal-author'>{name}</li>
                            <li style={{marginTop: '10px', paddingLeft:'10px'}}><i>ADMIN</i></li>
                        </ul>
                    </li>
                </ul>

                <div id='AddTopicModal-form'> 
                    <input type='text' id='input-title-topic' placeholder="Write title..." value={title} name='title' required onChange={onChangeUpdateTopicForm}></input>
                    <textarea id='input-description-topic' placeholder="Write description..." value={description} name='description' onChange={onChangeUpdateTopicForm}></textarea>
                    <div id='input-image-topic'>
                        {componentImg}
                    </div>
                </div>
                <div className='btn-post-submit'>
                    <button type='submit'>UPDATE</button>
                    <div id='btn-topic-update-none'>UPDATE</div>
                </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateTopic;