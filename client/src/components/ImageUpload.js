import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faL, faPen, faXmark } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid'

const ImageUpload = ({ selectedImages, setSelectedImages, selectedVideos, setSelectedVideos, handleClearImages, setOff, setSelectedFiles, setPostForm, PostForm, setLoading }) => {

    const WIDTH = 700
    const handleImageSelect = async (event) => {
      setLoading(true)
      const files = event.target.files;
      const selectedFiles = [];
      const selectedImagesArray = [];
      const selectedVideosArray = [];
      let nameFile = '';
  
      for (let i = 0; i < files.length; i++) {
          const image_file = files[i];
          const fileType = image_file.type;
          if (fileType.startsWith('image/')) {
            const res = await image_to_base64(image_file)
            if (res) {
              const resized = await reduce_image_file_size(res)
              selectedImagesArray.push(resized)
            }
            
            const new_image_file = await processImage(image_file);
            selectedFiles.push(new_image_file);
    
            nameFile += new_image_file.name + '/';
          } else if (fileType.startsWith('video/')) {
                // Đây là file video
                const videoURL = URL.createObjectURL(image_file)
                selectedVideosArray.push(videoURL)
              
                const newFileName = uuidv4() + '.mp4'

                try {
                const fileData = await readFileAsync(image_file);

                const blob = new Blob([fileData], { type: image_file.type });
                const newFile = new File([blob], newFileName, { type: image_file.type });
                selectedFiles.push(newFile)
                } catch (error) {
                console.error('Lỗi khi đọc file:', error);
                }  
                nameFile += newFileName + '/';
          } else {
              // Loại file không được hỗ trợ
              console.log('Loại file không được hỗ trợ:', image_file);
          }
      }
      setSelectedFiles(selectedFiles)
      setSelectedImages(selectedImagesArray)
      setSelectedVideos(selectedVideosArray)
      setPostForm({ ...PostForm, file: nameFile })
      setLoading(false)
  };

  function readFileAsync(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function(event) {
        resolve(event.target.result);
      };
      reader.onerror = function(event) {
        reject(event.target.error);
      };
      reader.readAsArrayBuffer(file);
    });
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

    const fileInputRef = useRef(null);

    const handleOpenFile = () => {
        fileInputRef.current.click();
    };

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
  
  

    if(selectedImages.length != 0 || selectedVideos.length != 0){
        document.getElementById("input-file").style.height='auto'
        document.getElementById("ChooseFile").style.display='none'
        return (
            <div>
                <input type="file" name='avatar' accept='.png, .jpg, .jpeg, .mp4' multiple onChange={handleImageSelect} id='ChooseFile' ref={fileInputRef} style={{display : 'none'}} />
                <h4 onClick={handleOpenFile} className='OpenChooseFile2'><FontAwesomeIcon icon={faPen} />&nbsp; Edit All</h4>
                <div id='CloseChooseFile2' onClick={handleClearImages}><FontAwesomeIcon icon={faXmark} size='lg' /></div>
                <div className='fileChoose'>
                    {selectedImages.map((image, index) => 
                      ( <img key={index} src={image} style={{maxWidth: '100%'}} /> )
                    )}

                    {selectedVideos.map((video, index) => 
                      ( <video src={video} key={index} preload="metadata" autoPlay loop width='528' height='285' style={{maxWidth: '100%'}} controls></video> )
                    )}
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