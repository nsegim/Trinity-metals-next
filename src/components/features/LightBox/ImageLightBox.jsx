
"use client"
import React, { useState } from "react";
import TheModal from "./Modal";
import Image from "next/image";

const ImageLightBox = ({ images, renderImage }) => {
  const [clickedImg, setClickedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [clickedImageRenderByApi, setClickedImageRenderByApi] = useState(null);

  const handleClick = (item, index) => {
    setCurrentIndex(index);
    setClickedImg(item.link);
    setClickedImageRenderByApi(item?.guid?.rendered);

  };

  const handleRotationRight = () => {
    const totalLength = images.length;
    const newIndex = (currentIndex + 1) % totalLength;
    setCurrentIndex(newIndex);
    setClickedImg(images[newIndex].link);
    setClickedImageRenderByApi(images[newIndex]?.guid?.rendered);
  };

  const handleRotationLeft = () => {
    const totalLength = images.length;
    const newIndex = (currentIndex - 1 + totalLength) % totalLength;
    setCurrentIndex(newIndex);
    setClickedImg(images[newIndex].link);
    setClickedImageRenderByApi(images[newIndex]?.guid?.rendered);
  };

  return (
    <div>
      {/* Parent Component Controls Layout */}
        {renderImage && renderImage?.length > 0 
        
        ? renderImage(images, handleClick)
         :
          <div className="image-grid-wrapper">
            <div className="the-image-grid">
              {images.map((item, index) => (
                <div key={index} className={`grid-item${index + 1}`}>
                  <Image
                    src={item.link}
                    alt={item.text}
                    width={300}
                    height={200}
                    className="gallery-image"
                    onClick={() => handleClick(item, index)}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div> 
         } 
          


      {/* Lightbox Modal */}
      {clickedImg && (
        <TheModal
          clickedImg={clickedImg}
          clickedImageRenderByApi={clickedImageRenderByApi}
          handelRotationLeft={handleRotationLeft}
          handelRotationRight={handleRotationRight}
          setClickedImg={setClickedImg}
          setClickedImageRenderByApi={setClickedImageRenderByApi}
        />
      )}
    </div>
  );
};

export default ImageLightBox;

