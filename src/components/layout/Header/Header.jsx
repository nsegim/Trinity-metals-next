"use client"
import "./header.css";
import ImageGallery from "../../common/ImageGallery";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Link from "next/link";
import { useState } from "react";
import Menus from "../../common/Menu/Menu";
import OffcanvasMenu from "../../layout/Offcanvas/OffcanvasMenu";
import LanguageSwitcher from "../../common/LanguageSwitcher/LanguageSwitcher";
// import { useTranslation } from "react-i18next";
import { useTranslation } from "@/app/context/TranslationContext";

const SiteHeader = () => {
  const [show, setShow] = useState(null)
  const onHoverListener = (dropDown)=>(setShow(dropDown))
  const onRemovePointer = ()=>(setShow(false))

   const { dict, lang } = useTranslation()
   const currentLanng = lang


  return (
    <div className="header">
      <div className="top-bar">
        <div className="container basic-info-wrapper">
          <div className="contact-info">
            <a href="#">
              <ImageGallery imageName={undefined} customClass={undefined} imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/phone-icon.svg" width={13.44} height={14} />
              <span>+250 791 959 034</span>
            </a>
            <a href="#">
              <ImageGallery imageName={undefined} customClass={undefined} imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/envelope.svg" width={13} height={14} />
              <span><span>{(dict.header.email)}</span>: info.rw@trinity-metals.com</span>
            </a>
          </div>
          
          <div className="right-tools">
             <LanguageSwitcher />
            <div className="social-links">
                <Link href="/Careers" className="careerBtn">
                  {(dict.header.careers)}
                </Link>
                <ul className="social-icon">
                  <li>
                    <a href="https://x.com/Trinity_Metals" target="_blank">
                    <ImageGallery imageName={undefined} customClass={undefined} imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/X-icon.svg" width={14} height={14}  />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/trinitymetalsgroupltd/?viewAsMember=true" target="_blank" className="linkedInIcon">
                       <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 24 24">
                         <path d="M9,17H6.477v-7H9V17z M7.694,8.717c-0.771,0-1.286-0.514-1.286-1.2s0.514-1.2,1.371-1.2c0.771,0,1.286,0.514,1.286,1.2	S8.551,8.717,7.694,8.717z M18,17h-2.442v-3.826c0-1.058-0.651-1.302-0.895-1.302s-1.058,0.163-1.058,1.302c0,0.163,0,3.826,0,3.826	h-2.523v-7h2.523v0.977C13.93,10.407,14.581,10,15.802,10S18,10.977,18,13.174V17z"></path>
                       </svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://youtu.be/tfJO_Fxl33c?si=fdC9qCcIe3P-bRro" target="_blank">
                      <ImageGallery imageName={undefined} customClass={undefined} imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Youtube-icon.svg" width={14} height={14} />
                    </a>
                  </li>
            </ul>
          </div>
          </div>
          
        </div>
      </div>
      <div className="container the_header">
        <div className="site-logo">
          <Link href="/">
            <ImageGallery imageName={undefined}
              imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/site-logo1.png"
              customClass="site-image-logo" width={148.740234375} height={69.51000213623047}
            />
          </Link>
        </div>
        
        <div className="site-menu-container">
          <Menus />
        </div>
        
        <OffcanvasMenu />

        <div className="contact-btn">
          <Link href={`${currentLanng}/contact-us`} className="hover-green">
            <span> {(dict.header["contact-us"])}</span>
            <ImageGallery imageName={undefined} customClass={undefined} imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/contact-us-icon.svg" width={14} height={15} />
          </Link>
        </div>

        
        
      </div>
      
    </div>
  );
};

export default SiteHeader;
