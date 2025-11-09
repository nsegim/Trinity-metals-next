// app/gallery/videos/page.tsx
'use client';

import { useEffect, useState, useRef } from "react";
import ImageGallery from "@/components/ImageGallery";
import LightBox from "./VideoLightBox/LightBox";
import Spinner from "@/components/Spinner/Spinner";
import SiteHeader from "@/components/header/Header";
import SiteFooter from "@/components/Footer/Footer";
import { fetchData } from "@/lib/config/apiConfig";
import { useTranslation } from "@/app/context/TranslationContext";
import "../styles.css";

interface YouTubeVideo {
  snippet: {
    resourceId: { videoId: string };
    thumbnails: { medium: { url: string } };
    title: string;
  };
}

export default function VideoGallery() {
  const { dict } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("Tab1");
  const [youtubeList, setYoutubeList] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedPlayButtonLink, setClickedPlayButtonLink] = useState("");
  const popup = useRef<HTMLDivElement>(null);

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popup.current && !popup.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Fetch YouTube videos
  useEffect(() => {
    const fetchYoutubeData = async () => {
      try {
        setLoading(true);
        setError(null);

        const APIKey = "AIzaSyBDIRHkiZhooxRilDmjWuFtAt6ax2ZDrVI";
        const channelId = "UCs7L7h5xrBdfI7_4YLn66QA";

        // Step 1: Get uploads playlist ID
        const channelRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${APIKey}`
        );
        if (!channelRes.ok) throw new Error(`Channel error: ${channelRes.status}`);
        const channelData = await channelRes.json();
        const uploadsPlaylistId = channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads;
        if (!uploadsPlaylistId) throw new Error("No uploads playlist found");

        // Step 2: Get videos
        const videosRes = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=25&key=${APIKey}`
        );
        if (!videosRes.ok) throw new Error(`Videos error: ${videosRes.status}`);
        const videosData = await videosRes.json();

        setYoutubeList(videosData.items || []);
      } catch (err: any) {
        console.error("YouTube API Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchYoutubeData();
  }, []);

  // Play video
  const handleVideoPlay = (event: React.MouseEvent, item: YouTubeVideo) => {
    event.preventDefault();
    setClickedPlayButtonLink(item.snippet.resourceId.videoId);
    setIsOpen(true);
  };

  const handleClosePopup = () => setIsOpen(false);

  const tabs = ["all", "visitors", "events", "sports"];

  return (
    <>
      <SiteHeader />

      {/* Hero */}
      <div className="custom-hero video-gallery">
        <div className="child-item-wrapper z-1">
          <h1 className="heading text-uppercase">Videos</h1>
        </div>
      </div>

      {/* Navigation */}
      <div className="gallery-navigation">
        <div className="gallery-nav-wrapper d-flex">
          <a href="/gallery/photos" className="gallery-nav">
            <img src="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Photo-icon.svg" alt="Photos" />
            <span>{t("gallery.photo-gallery")}</span>
          </a>
          <a href="/gallery/videos" className="gallery-nav visited">
            <img src="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Video-icon.svg" alt="Videos" />
            <span>{t("gallery.video-gallery")}</span>
          </a>
        </div>
      </div>

      {/* Video Gallery */}
      <div className="video-gallery-wrapper">
        <div className="video-gallery-container container">

          {/* Filters */}
          <div className="video-gallery-filters">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveFilter(`Tab${index + 1}`)}
                className={`filter-title ${activeFilter === `Tab${index + 1}` ? "active-button" : ""}`}
              >
                {t(`Tabs.${tab}`)}
              </button>
            ))}
          </div>

          {/* Videos */}
          <div className="videos-wrapper">
            {loading ? (
              <Spinner />
            ) : error ? (
              <p className="text-center text-danger">Error: {error}</p>
            ) : youtubeList.length > 0 ? (
              <div className="video-category All">
                {youtubeList.map((item, index) => (
                  <div key={index} className="image-grid youtube-vid-wrapper">
                    <ImageGallery
                      imageUrl={item.snippet.thumbnails.medium.url}
                      customClass="gallery-img"
                    />
                    <div className="play-video" onClick={(e) => handleVideoPlay(e, item)}>
                      <ImageGallery
                        imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Link-e1739190132637.png"
                        customClass="play-video-player"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center">No videos found.</p>
            )}
          </div>

          {/* Lightbox */}
          {isOpen && (
            <LightBox
              clickedPlayButtonLink={`https://www.youtube.com/embed/${clickedPlayButtonLink}?autoplay=1&rel=0&modestbranding=1`}
              handleClosePopup={handleClosePopup}
              ref={popup}
            />
          )}
        </div>
      </div>

      <SiteFooter />
    </>
  );
}