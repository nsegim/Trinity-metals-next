
// const imageArray = [
//   {
//     'link': 'https://contents.trinity-metals.com/wp-content/uploads/2025/02/Excavator-scaled.jpeg',
//     'text': 'Excavator as one of triniy tools'
//   },
//   {
//     'link': 'https://contents.trinity-metals.com/wp-content/uploads/2025/02/trinity-employees-scaled.jpeg',
//     'text': 'Employees of triniy'
//   },
//   {
//     'link': 'https://contents.trinity-metals.com/wp-content/uploads/2025/02/trinity-employes2-scaled.jpeg',
//     'text': 'Employees of triniy'
//   }
// ]


// const ImageLightBox = (()=>{

//   const [clickedImg, setClickedImg] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(null);
  
  
//   const handleClick = (item, index) => {
//     setCurrentIndex(index);
//     setClickedImg(item.link);
  
//   };


//   const handelRotationRight = () => {
//     const totalLength = imageArray.length;
//     if (currentIndex + 1 >= totalLength) {
//       setCurrentIndex(0);
//       const newUrl = imageArray[0].link;
//       setClickedImg(newUrl);
//       return;
//     }

//     const newIndex = currentIndex + 1;
//     const newUrl = imageArray.filter((item) => {
//       return imageArray.indexOf(item) === newIndex;
//     });
//     const newItem = newUrl[0].link;
//     setClickedImg(newItem);
//     setCurrentIndex(newIndex);
//   };
  

//   const handelRotationLeft = () => {
//     const totalLength = imageArray.length;
//     if (currentIndex === 0) {
//       setCurrentIndex(totalLength - 1);
//       const newUrl = imageArray[totalLength - 1].link;
//       setClickedImg(newUrl);
//       return;
//     }

//     const newIndex = currentIndex - 1;
//     const newUrl = imageArray.filter((item) => {
//       return imageArray.indexOf(item) === newIndex;
//     });
//     const newItem = newUrl[0].link;
//     setClickedImg(newItem);
//     setCurrentIndex(newIndex);
//   };

//     return(
          
//         <div className="image-grid-wrapper">
//               <div className="the-image-grid">
//                   {imageArray.map((item, index)=> (
                      
//                           <div key={index} className={`grid-item${index + 1}`}>
//                             <img src={item.link} alt={item.text} className='gallery-image' onClick={() => { handleClick(item, index) }} />
//                           </div>
                          
                            
//                   ))}
//               </div>
//             <div>
//               {clickedImg && (
//                  <TheModal 
//                  clickedImg = {clickedImg}
//                  handelRotationLeft = {handelRotationLeft}
//                  handelRotationRight = {handelRotationRight}
//                  setClickedImg = {setClickedImg}
//                />
//               )}
//             </div>
            
           

            
//         </div>
        


//     )
// })

// export default ImageLightBox

"use client"
import React, { useState } from "react";
import TheModal from "./Modal";

const ImageLightBox = ({ images, renderImage }) => {
  const [clickedImg, setClickedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [clickedImageRenderByApi, setClickedImageRenderByApi] = useState(null);

  const handleClick = (item, index) => {
    setCurrentIndex(index);
    setClickedImg(item.link);
    setClickedImageRenderByApi(item?.guid?.rendered);

    //console.log(images)
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
                  <img
                    src={item.link}
                    alt={item.text}
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

