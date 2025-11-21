// components/SocialShare/SocialShare.tsx
'use client';

import React, { useState, useRef, useEffect } from "react";
import ImageGallery from "../ImageGallery";
import "./SocialShare.css";

interface SocialShareProps {
  postUrl: string;
  postTitle: string;
}

const socialMediaLinks = [
  { name: "Facebook", url: "https://www.facebook.com/sharer/sharer.php?u=", img: "Background.svg" },
  { name: "Twitter", url: "https://twitter.com/intent/tweet?url=", img: "Background-1.svg" },
  { name: "Pinterest", url: "https://pinterest.com/pin/create/button/?url=", img: "Background-2.svg" },
  { name: "Email", url: "mailto:?subject=Check this out!&body=", img: "Background-3.svg" },
];

const morePlatforms = [
  { name: "Reddit", url: "https://www.reddit.com/submit?url=", img: "reddit-icon.svg" },
  { name: "Tumblr", url: "https://www.tumblr.com/widgets/share/tool?canonicalUrl=", img: "tumblr-round-icon.svg" },
  { name: "Messenger", url: "https://www.messenger.com/share?link=", img: "facebook-messenger-icon.svg" },
  { name: "Telegram", url: "https://t.me/share/url?url=", img: "telegram-icon.svg" },
];

export default function SocialShare({ postUrl, postTitle }: SocialShareProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(postTitle);

  return (
    <div className="social-share-container">
      {/* Main Icons */}
      <ul className="social-icons">
        {socialMediaLinks.map((platform) => (
          <li key={platform.name}>
            <a
              href={`${platform.url}${encodedUrl}${platform.name === "Email" ? `&body=${encodedTitle}%20-%20${encodedUrl}` : ""}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${platform.name}`}
            >
              <ImageGallery
                imageUrl={`https://contents.trinity-metals.com/wp-content/uploads/2025/02/${platform.img}`}
                imageName={`${platform.name} Share`}
                customClass="Icon image"
                height={40}
                width={40}
                alt={undefined}
              />

            </a>
          </li>
        ))}

        {/* More Button */}
        <li>
          <button
            onClick={() => setShowPopup(!showPopup)}
            className="share-share-button"
            aria-label="More sharing options"
          >
            <ImageGallery
              imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Background-4.svg"
              imageName="More Share"
              customClass="Icon image"
                height={40}
                width={40}
              alt={undefined}
            />
          </button>
        </li>
      </ul>

      {/* Popup */}
      {showPopup && (
        <div className="share-popup" ref={popupRef}>
          {morePlatforms.map((platform) => (
            <a
              key={platform.name}
              href={`${platform.url}${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${platform.name}`}
            >
              <ImageGallery
                imageUrl={`https://contents.trinity-metals.com/wp-content/uploads/2025/02/${platform.img}`}
                imageName={`${platform.name} Share`}
                customClass="Icon image"
                height={40}
                width={40}
                alt={undefined} 
              />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}