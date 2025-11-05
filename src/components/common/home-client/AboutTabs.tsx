'use client';

import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import ImageGallery from '../../common/ImageGallery'

export default function AboutTabs({ dict }: { dict: any }) {
  const [activeTab, setActiveTab] = useState('tab1');
  const { t } = useTranslation();

  const handleTabClick = useCallback((tab) => {
    setActiveTab(tab);
  }, []);
  
  return (

    <div className="tabs-wrapper">
      <div className="tabs-buttons">
        <button className={`tab-button ${activeTab === "tab1" ? "active-button" : ""}`}
          onClick={() => handleTabClick("tab1")}
        >
          {(dict.home["about-tab-who-we-are"])}
        </button>
        <button className={`tab-button ${activeTab === "tab2" ? "active-button" : ""}`}
          onClick={() => handleTabClick("tab2")}
        >
          {(dict.home["about-tab-vision"])}
        </button>
        <button className={`tab-button ${activeTab === "tab3" ? "active-button" : ""}`}
          onClick={() => handleTabClick("tab3")}
        >
          {(dict.home["about-tab-mission"])}
        </button>
      </div>

      {/* Tab Content */}
        <div className="tab-content-wrapper">
          <div className={`tab-content ${activeTab === "tab1" ? "active-tab" : ""}`}>
            <div className="tab-content-holder">
              <div className="text-content">
                <p>
                    {(dict.home["who-we-are-content"])}
                </p>
              </div>
              <div className="wrapper_content">
                <div className="the_content_left">
                  <div className="who-are-we-numbers">
                    <div className="employess-count">
                      <span>6000+</span>
                      <p> {(dict.home["employees"])}</p>
                    </div>
                  </div>
                  <div className="mine-site-numbers">
                    <div className="mine-site-count">
                      <span>3</span>
                      <p> {(dict.home["mine-site"])}</p>
                    </div>
                  </div>
                </div>
                <div className="the_content_right">
                  <ImageGallery  
                  imageUrl='https://contents.trinity-metals.com/wp-content/uploads/2025/02/mine_site_employees.png.webp'
                  customClass="miners_img1"
                  width={187} height={85} imageName={undefined}                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className={`tab-content ${activeTab === "tab2" ? "active-tab" : ""}`}>
            <div className="tab-content-holder">
              <div className="text-content">
                <p>
                    {(dict.home["our-vision-content"])}
                </p>
              </div>
              <div className="wrapper_content">
                <div className="the_content_right">
                  <ImageGallery 
                  imageUrl='https://contents.trinity-metals.com/wp-content/uploads/2025/02/mine_site_employees2.png.webp'
                  customClass="miners_img1"
                  width={187} height={85} imageName={undefined}                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className={`tab-content ${activeTab === "tab3" ? "active-tab" : ""}`}>
            <div className="tab-content-holder">
              <div className="text-content">
                <p>
                    {(dict.home["our-mission-content"])}
                </p>
              </div>
              <div className="wrapper_content">
                <div className="the_content_right">
                  <ImageGallery 
                  imageUrl='https://contents.trinity-metals.com/wp-content/uploads/2025/02/mine_site_employees3.png.webp'
                  customClass="miners_img1"
                  width={187} height={85} imageName={undefined}                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
