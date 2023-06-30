import React, { useEffect, useState } from 'react';

function getImageDimensions(imageUrl, callback) {
  const image = new Image();

  image.onload = function() {
    const imageDimensions = {
      width: this.width,
      height: this.height
    };
    callback(null, imageDimensions);
  };

  image.onerror = function() {
    callback(new Error('Không thể tải hình ảnh.'));
  };

  image.src = imageUrl;
}

const ImageComponent = ({imageUrl}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    getImageDimensions(imageUrl, (error, imageDimensions) => {
      if (error) {
        console.error(error);
      } else {
        setDimensions(imageDimensions);
      }
    });
  }, []);

  if(dimensions.width!=0 && dimensions.height!=0) {
    if(dimensions.width>700){
      const resize = dimensions.width - 700
      var style
      if(dimensions.height-resize>850){
        style = {
          width : `700px`,
          height : `850px`
        }
      } else {
        style = {
          width : `700px`,
          height : `${dimensions.height-resize}px`
        }
      }
      return (
        <img src={imageUrl} style={style}></img>
      )
    }else{
      return (
        <img src={imageUrl}></img>
      )
    }
  }
}

export default ImageComponent;