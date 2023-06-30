import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faL, faPen, faXmark } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid'

const ImageUpload = ({ selectedImages, setSelectedImages, handleClearImages, setOff, setSelectedFiles, setPostForm, PostForm }) => {

    const handleImageSelect = (event) => {
        const files = event.target.files;
        const selectedFiles = [];
        let nameFile = '';
      
        const loadImage = (file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
      
            reader.onload = (e) => {
              resolve(e.target.result);
            };
      
            reader.onerror = (error) => {
              reject(error);
            };
      
            reader.readAsDataURL(file);
          });
        };
      
        const processFiles = async () => {
          const promises = [];
      
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.size > 20971520) {
              console.log("full");
            } else {
              selectedFiles.push(file);
              nameFile += uuidv4() + '.png/';
              const promise = loadImage(file);
              promises.push(promise);
            }
          }
      
          try {
            const results = await Promise.all(promises);
            setSelectedFiles(selectedFiles);
            setSelectedImages(results);
            setPostForm({ ...PostForm, file: nameFile });
          } catch (error) {
            console.error("Lỗi xử lý file:", error);
          }
        };
      
        processFiles();
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
                <div className='fileChoose'>
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