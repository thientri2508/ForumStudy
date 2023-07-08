import React from 'react';
import { useContext, useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faUserPen, faRotateRight, faCheck } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../contexts/AuthContext'
import {apiUrl} from '../contexts/constants'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import Card from './Card/Card'
import EditAccountForm from './EditAccountForm';

const EditProfile = ({user}) => {

    const [avatar, setAvatar] = useState(null)
    const [posts, setPosts] = useState(null)
    const [likes, setLikes] = useState(null)

    useEffect(() => {
        fetch(`${apiUrl}/posts/amount/${user._id}`)
        .then(response => response.json())
        .then(data => setPosts(data.posts))
        .catch(err => console.log(err))

        fetch(`${apiUrl}/likes/amount/user/${user._id}`)
        .then(response => response.json())
        .then(data => setLikes(data.like))  
        .catch(err => console.log(err))
    }, [])

    const { 
        showEditProfile, 
        setShowEditProfile, 
        updateAvatar
        } = useContext(AuthContext)

    var style
    if(showEditProfile){
        style = { display: 'block'}
    } else {
        style = { display: 'none'}
    }

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
                    let ratio = 170 / image.width;
                    canvas.width = 170;
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

    const CloseEditProfile =  () => {
        setShowEditProfile(false)
        document.documentElement.style.overflow = 'auto';
        var img = document.getElementById("img-avatar")
        var fileInput = document.getElementById("file-avatar");
        fileInput.value = "";
        if(user.avatar != "") {
            img.src = `${user.avatar}`
        } else{
            img.src = require('../image/account.png')
        }
        setAvatar(null)
    }

    const CancelUpdateAvatar =  () => {
        var img = document.getElementById("img-avatar")
        var fileInput = document.getElementById("file-avatar");
        fileInput.value = "";
        if(user.avatar != "") {
            img.src = `${user.avatar}`
        } else{
            img.src = require('../image/account.png')
        }
        setAvatar(null)
    }

    const UpdateAvatar = async (event) => {
        event.preventDefault()
        try {
			await updateAvatar({avatar: `${apiUrl}/upload/file/${avatar.name}`})  
		} catch (error) {
			console.log(error)
		}
        const formData = new FormData()
        formData.set("avatar", avatar)
        try {
            await axios.post(`${apiUrl}/upload`, formData) 
        } catch (error) {
            console.log(error)
        }
        var fileInput = document.getElementById("file-avatar");
        fileInput.value = "";
        setAvatar(null)
    }

    const fileInputRef = useRef(null);
    const handleOpenFile = () => {
        fileInputRef.current.click();
    };

    const handleImageSelect = async (event) => {
        var img = document.getElementById("img-avatar")
        if(event.target.files[0]) {
            const file = event.target.files[0]
            const maxSize = 10*1024*1024
            if(file.size > maxSize) {
                console.log("File ảnh quá lớn")
            } else{
                img.src = URL.createObjectURL(file)
                const new_image_file = await processImage(file);
                setAvatar(new_image_file)
            } 
        }
    }

    let updateAvatarToolbar = (<></>)
    if(avatar!=null) {
        updateAvatarToolbar = (
            <div id='update-avatar'>
                <div className='cancel-update' onClick={CancelUpdateAvatar}><FontAwesomeIcon icon={faRotateRight} size='xl' /></div>
                <div className='confirm-update'onClick={UpdateAvatar}><FontAwesomeIcon icon={faCheck} size='xl' /></div>
            </div>
        )
    }

    let body
    if(user.avatar != ""){
        body = (
            <div>
                <div className='infor-avatar'>
                    <img src={user.avatar} id='img-avatar' ></img>
                    <div className='edit-avatar' onClick={handleOpenFile}><FontAwesomeIcon icon={faUserPen} size='xl' /></div>
                    {updateAvatarToolbar}
                    <input type='file' accept='.png, .jpg, .jpeg' id='file-avatar' onChange={handleImageSelect} ref={fileInputRef} style={{display : 'none'}}></input>
                </div>
                <h2 className='infor-name'>{user.fullname}</h2>
            </div>
        )
    } else{
        body = (
            <div>
                <div className='infor-avatar'>
                    <img src={ require('../image/account.png') } id='img-avatar'></img>
                    <div className='edit-avatar' onClick={handleOpenFile}><FontAwesomeIcon icon={faUserPen} size='xl' /></div>
                    {updateAvatarToolbar}
                    <input type='file' accept='.png, .jpg, .jpeg' id='file-avatar' onChange={handleImageSelect} ref={fileInputRef} style={{display : 'none'}}></input>
                </div>
                <h2 className='infor-name'>{user.fullname}</h2>
            </div>
        )
    }

    const UpdateProfileForm = () => {
        var x = document.getElementById("myprofile-left");
        var y = document.getElementById("myprofile-right");

        x.style.left = "-500px";
        y.style.right = "0px";
        x.style.opacity = 0;
        y.style.opacity = 1;
    }

    const UpdateProfileAvatar = () => {
        var x = document.getElementById("myprofile-left");
        var y = document.getElementById("myprofile-right");

        x.style.left = "0px";
        y.style.right = "-500px";
        x.style.opacity = 1;
        y.style.opacity = 0;
    }

    return (
        <div className='bg-loading' style={style}>
            <div id='EditProfile'>
                <h3 className='create-post'>My Profile</h3>
                <div className='close-AddPostModal' onClick={CloseEditProfile}><FontAwesomeIcon icon={faXmark} size='xl' /></div>
                <div className='wrapper-myprofile'>
                    <div id='myprofile-left'>
                        {body}
                        <Card UpdateProfileForm={UpdateProfileForm} posts={posts} likes={likes}></Card>
                    </div>

                    <EditAccountForm UpdateProfileAvatar={UpdateProfileAvatar} user={user}></EditAccountForm>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;