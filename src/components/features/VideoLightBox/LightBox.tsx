// components/LightBox/VideoLightBox/LightBox.tsx
'use client';

import React, { forwardRef } from 'react';
import "./LightBox.css";

interface LightBoxProps {
  clickedPlayButtonLink: string;
  handleClosePopup: () => void;
}

const LightBox = forwardRef<HTMLDivElement, LightBoxProps>(({ clickedPlayButtonLink, handleClosePopup }, ref) => {
  return (
    <div className="lightbox" ref={ref}>
      <span className="close-btn" onClick={handleClosePopup}>
        ×
      </span>
      <div className="lightbox-content">
        <div className="video-container">
          <iframe
            id="lightbox-video"
            src={clickedPlayButtonLink}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video Lightbox"
          ></iframe>
        </div>
      </div>
    </div>
  );
});

LightBox.displayName = "LightBox";

export default LightBox;