import Image from "next/image";
import PropTypes from "prop-types";

const ImageGallery = ({ imageUrl, imageName, customClass, height, width }) => {
  const placeholder = "/images/placeholder.jpg"; // Use absolute path under /public
  const imageSrc = imageUrl
    ? imageUrl
    : imageName
    ? `/images/${imageName}`
    : placeholder;

  return (
    
      <Image
        className={customClass}
        src={imageSrc}
        alt={imageName || "Gallery Image"}
        height={height}
        width={width}
        
      />
    
  );
};

ImageGallery.propTypes = {
  imageUrl: PropTypes.string,
  imageName: PropTypes.string,
  customClass: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};

export default ImageGallery;
 