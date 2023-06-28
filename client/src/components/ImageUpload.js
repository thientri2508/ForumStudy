import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons'

const ImageUpload = ({ selectedImages, setSelectedImages, handleClearImages, setOff, setSelectedFiles, setPostForm, PostForm }) => {

    const handleImageSelect = (event) => {
        const files = event.target.files;
        const selectedImagesArray = [];
        const selectedFiles = [];
        let nameFile = ''
    
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if(file.size > 20971520) {
                console.log("full")
            } else{
                selectedFiles.push(file);
                nameFile += file.name + '/';
            
                const reader = new FileReader();
    
                reader.onload = (e) => {
                    selectedImagesArray.push(e.target.result);
    
                    // if (selectedImagesArray.length === files.length) {
                    //     setSelectedImages(selectedImagesArray)
                    // }
                    setSelectedImages(selectedImagesArray)
                };
    
                reader.readAsDataURL(files[i]);
            }
        }
        setSelectedFiles(selectedFiles)
        setPostForm({...PostForm, file: nameFile})
      };

    const fileInputRef = useRef(null);

    const handleOpenFile = () => {
        fileInputRef.current.click();
    };


    if(selectedImages.length != 0){
        document.getElementById("input-file").style.height='auto'
        document.getElementById("ChooseFile").style.display='none'
        return (
            <div>
                <input type="file" name='avatar' accept='.png, .jpg, .jpeg, .mp4' multiple onChange={handleImageSelect} id='ChooseFile' ref={fileInputRef} style={{display : 'none'}} />
                <h4 onClick={handleOpenFile} className='OpenChooseFile2'><FontAwesomeIcon icon={faPen} />&nbsp; Edit All</h4>
                <div id='CloseChooseFile2' onClick={handleClearImages}><FontAwesomeIcon icon={faXmark} size='lg' /></div>
                <div>
                    {selectedImages.map((image, index) => (
                    <img key={index} src={image} alt={`Image ${index}`} style={{ width: '200px', height: '200px'}} />
                    ))}
                </div>
            </div>
    
        );  
    }

    return (
        <div>
            <div className='OpenChooseFile1'>
                <div className='OpenChooseFile1-title'>
                    <div><img src={ require('../image/image.png') }></img></div>
                    <h2>Add photo/video</h2>
                    <div>or drag and drop</div>
                </div>
                <div id='CloseChooseFile1' onClick={setOff}><FontAwesomeIcon icon={faXmark} size='lg' /></div>
            </div>
            <input type="file" name='avatar' accept='.png, .jpg, .jpeg, .mp4' multiple onChange={handleImageSelect} id='ChooseFile' ref={fileInputRef} />
        </div>

    );
};

export default ImageUpload;