
import Link from 'next/link'

 import ImageGallery from "../../components/common/ImageGallery.jsx";
 import IncreamentCounter from "../../components/common/Counter.jsx"
 import Image from 'next/image.js';
import dynamic from 'next/dynamic';
import './home.css'

// Only lazy load below-the-fold components
const LoopGrid = dynamic(() => import("../../components/common/Loop-grid/LoopGrid"));
const ImageLightBox = dynamic(() => import("../../components/features/LightBox/ImageLightBox"));
import AboutTabs from '@/components/common/home-client/AboutTabs';
// import { useTranslation } from 'react-i18next';

import { getDictionary } from '@/app/i18n/dictionaries';
 import { Locale } from '@/app/i18n/config';
import { headers } from "next/headers";

import "./globals.css";
import { lang } from 'moment';

export async function generateMetadata() {
  const dict = await getDictionary("en"); // or detect lng dynamically

  return {
    title: dict.home.meta.title,
    description: dict.home.meta.description,
    openGraph: {
      title: dict.home.meta.title,
      description: dict.home.meta.description,
      url: `https://trinity-metals.com/`,
      type: "website",
        images: [
        {
          url: "https://contents.trinity-metals.com/wp-content/uploads/2025/02/site-logo1.png", // REQUIRED
          width: 1200,
          height: 630,
          alt: "Trinity Metals",
        },
      ],
    },
    alternates: {
      canonical: "https://trinity-metals.com",
    },
  };
}


const BottomImagesGallery = [
  {
    'link': 'https://contents.trinity-metals.com/wp-content/uploads/2025/06/3_32.webp',
    'text': 'H.E Paul Kagame as our visitor'
  },
  {
    'link': 'https://contents.trinity-metals.com/wp-content/uploads/2025/06/3_32-2.webp',
    'text': 'H.E Paul Kagame as our visitor 2'
  },
  {
    'link': 'https://contents.trinity-metals.com/wp-content/uploads/2025/02/trinity-employes2-scaled.jpeg',
    'text': 'Employees of triniy'
  }
];


  export default async function HomePage({
      params,
  }: {
      params: Promise<{ lng: Locale }>;
  }) {

     const userAgent = (await headers()).get("user-agent") || "";
    const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent)
   

  // ← UNWRAP THE PROMISE
  const { lng } = await params;

  // Now safe to use
  const dict = await getDictionary(lng);

  return (
    
     <>


    
      {/* Hero Section - Optimized for LCP */}
      <div className="hero-section home-hero">
        <div className="background-video-container">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            preload="metadata"
             poster="https://contents.trinity-metals.com/wp-content/uploads/2025/06/Tailings-1.webp"
            className="hero-video"
          >
            <source src="https://contents.trinity-metals.com/wp-content/uploads/2025/10/homepage-1-compressed.mp4" type="video/mp4" />
            {/* Fallback image for browsers that don't support video */}
            <Image
              src="https://contents.trinity-metals.com/wp-content/uploads/2025/02/hero-fallback.jpg" 
              alt="Trinity Metals" 
              width={1920}
              height={1080}
              
              className={'hero-fallback-image'}
              
            />
          </video>
        </div>
        <div className="background-overlay"></div>  
        <div className="container hero-section-content-wrapper">
          <div className="basic-info">
            <h1 className="section-header">
              <span className="welcome-icon">
                <Image 
                  src="https://contents.trinity-metals.com/wp-content/uploads/2025/02/welcome-icon.svg"
                  height={10}
                  width={36} alt='' className={undefined}         />
              </span>
              {(dict.home.welcome)}
            </h1>
            <h2 dangerouslySetInnerHTML={{ __html: (dict.home["welcome-description"]) }} className="section-desc" />
            <p className="section-sub-desc">{(dict.home["min-description"])}</p>

            <div className="info-buttons">
              <div className="button-element">
                <Link href="#sectionRef"className="get-started">
                  
                  {(dict.home["get-stated-button"])}
                  <span>
                    <Image 
                      src="https://contents.trinity-metals.com/wp-content/uploads/2025/02/arrow-icon.svg"
                      height={24}
                      width={24} alt='' className={undefined}                />
                  </span>
                </Link>
              </div>

              <div className="button-element">
                <Link href={`/${lng}/projects`} className="view-projects transprent-button">
                  {(dict.home["view-project-button"])}
                  <span>
                    <Image 
                      src="https://contents.trinity-metals.com/wp-content/uploads/2025/02/arrow-icon.svg"
                      height={24}
                      width={24} alt='' className={undefined}              />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="coverage-precentages-wrapper">
          <div className="leadership-counter-wrapper">
            <div className="leadership-counter">
              <IncreamentCounter start={0} end={75} speed={20} />%
            </div>
            <p className="leader-text">
              {(dict.home["rwandan-leadership"])}
            </p>
          </div>
          <div className="workforce-counter-wrapper">
            <div className="workforce-counter">
              <IncreamentCounter start={0} end={99} speed={50} />%
            </div>
            <p className="workforce-text">
              {(dict.home["rwandan-workforce"])}           
            </p>
          </div>
        </div>
      </div>
      

       {/* About Us */}
        <div className="about-us-intro-section-wrapper container" id="sectionRef">
          <div className="basic-intro-left"></div>
          <div className="basic-intro-right">
            <div className="right-intro-wrapper">
              <div className="right-intro-header">
                <h2 className="heading">
                    {(dict.home["home-about-heading"])}
                </h2>
              </div>
            
              <div className="tabs-wrapper">
                {/* Tabs Buttons */}
                    <AboutTabs dict={dict} />

              <div className="buttonElement">
                <Link href={`${lng}/about`} className="hover-green">
                  <span>{(dict.home["read-more-button"])}</span>
                  <Image 
                    src='https://contents.trinity-metals.com/wp-content/uploads/2025/02/Arrow2.svg'
                    width={13} height={13} alt='' className={undefined} 
                                  />
                </Link>
              </div>
            </div>
          </div>
      </div>
     </div>  
 

      {/* Our Projects */}
      <div className="the-top-bg"></div>
      <div className="our-porject-wrapper">
        <div className="container">
          <div className="container-holder">
            <div className="sectionTops">
              <div className="section-heading">
                <h2 className="section-header-2">
                  <span className="welcome-icon">
                    <Image 
                      src='https://contents.trinity-metals.com/wp-content/uploads/2025/02/welcome-icon2.svg'
                      width={35.79} height={7} alt='' className={undefined}             />
                  </span>
                  {(dict.home["latest-work-section"])}
                </h2>
                <h3 className="heading">
                  <span className="text-white">
                    {(dict.home["our-project"])}
                  </span>
                </h3>
              </div>
              
              <div className="button-element">
                <Link href={`/${lng}/projects`} className="view-projects transprent-button">
                    {(dict.home["view-project-button"])}
                  <span>
                    <Image 
                      src='https://contents.trinity-metals.com/wp-content/uploads/2025/02/arrow-icon.svg'
                      width={26} height={25} alt='' className={undefined}                  />
                  </span>
                </Link>
              </div>
            </div>

            <div className="cards-wrapper d-flex">
              <div className="a-card">
                <div className="featured-image">
                  <Link href="/our-projects/nyakabingo">
                    <Image 
                      src='https://contents.trinity-metals.com/wp-content/uploads/2025/02/nyakabingo-mine-min.png.webp'
                      className="card-image"
                      width={412} height={370}
                       alt=''      
                                   />
                  </Link>  
                </div>
                <div className="project-title">
                  <Link href={`/${lng}/projects/nyakabingo-mine`}>
                    <span>
                       {(dict.home["trinity-Nyakabingo-mine"])}
                    </span>
                  </Link>
                </div>
              </div>
              
              <div className="a-card">
                <div className="featured-image">
                  <Link href={`/${lng}/projects/rutongo-mine`}>
                    <Image 
                      src='https://contents.trinity-metals.com/wp-content/uploads/2025/02/musha_mine-min.png.webp'
                      className="card-image"
                      width={412} height={370} alt=''              />
                  </Link>  
                </div>
                <div className="project-title">
                  <Link href={`/${lng}/projects/musha-mine`}>
                    <span>
                       {(dict.home["trinity-musha-mine"])}
                    </span>
                  </Link>
                </div>
              </div>
              
              <div className="a-card">
                <div className="featured-image">
                  <Link href="/our-projects/rutongo">
                    <Image 
                      src='https://contents.trinity-metals.com/wp-content/uploads/2025/02/rutongo-min.png.webp'
                      className="card-image"
                      width={412} height={370} alt=''         />
                  </Link>  
                </div>
                <div className="project-title">
                  <Link href="/our-projects/rutongo">
                    <span>
                       {(dict.home["rutongo-mine"])}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sustainability */}
      <div className="sastainability-section-wrapper sastain-home">
        <div className="container content-wrapper">
          <div className="d-flex Sastainability-content">
            <div className="col-md-6 Sastainability-image"></div>
            <div className="col-md-6 Sastainability-right">
              <h2 className="section-header">
                <span className="welcome-icon">
                  <Image 
                    src="https://contents.trinity-metals.com/wp-content/uploads/2025/06/Vector.svg"
                    width={36} height={6} alt='' className={undefined}                />
                </span>
                 {(dict.home["sustainability"])}
              </h2>

              <h3 className="heading w-100">
                <span>{(dict.home["we-are-energy"])}</span>
              </h3>

              <div className="text-content002">
                <p className=""> {(dict.home["we-are-energy-description"])}</p>
                <p className="">
                   {(dict.home["we-are-energy-description1"])}
                </p>
              </div>

              <div className="button-element">
                <Link href={`/${lng}/sustainability`} className="view-projects transprent-button">
                   {(dict.home["read-more-button"])}
                  <span>
                    <Image 
                      src='https://contents.trinity-metals.com/wp-content/uploads/2025/10/SVG.svg'
                      width={26} height={25} alt='' className={undefined}                />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest articles section */}
      <div className="article-sectionwrapper">
        <div className="container">
          <div className="sectionTops pb-4">
            <div className="section-heading">
              <h2 className="section-header-2 with-blue">
                <span className="welcome-icon-blue me-3">
                  <Image 
                    src="https://contents.trinity-metals.com/wp-content/uploads/2025/02/welcome-icon-blue.svg"
                    width={36} height={6} alt='' className={undefined}          />
                </span>
                  {(dict.home["blog-post-section"])}
              </h2>
              <h3 className="heading">
                <span>
                   {(dict.home["latest-articles"])}
                </span>
              </h3>
            </div>
            
            <div className="button-element">
              <Link href={`/${lng}/investor/latest-news`} className="explore-more">
                {(dict.home["read-more-button"])}
                <span>
                  <Image 
                    src="https://contents.trinity-metals.com/wp-content/uploads/2025/02/arrow-icon.svg"
                    width={26} height={25} alt='' className={undefined}               />
                </span>
              </Link>
            </div>
          </div>

          <div className="articles-cards-wrapper">
            {/* Only lazy load below-the-fold components */}
            <LoopGrid itemsPerPage={isMobile ? 1 : 3} />
          </div>
        </div>
      </div>
        
      {/* Our Gallery Section */}
      <div className="gallery-section">
        <div className="container">
          <div className="sectionTops">
            <div className="section-heading">
              <h2 className="section-header-2 with-blue">
                <span className="welcome-icon-blue me-3">
                  <Image 
                    src="https://contents.trinity-metals.com/wp-content/uploads/2025/02/welcome-icon-blue.svg"
                    width={36} height={8} alt='' className={undefined}            />
                </span>
                
                {(dict.home["media-section"])}


              </h2>
              <h3 className="heading">
                <span>
                  
                  {(dict.home["our-gallery"])}
                </span>
              </h3>
            </div>
            
            <div className="button-element">
              <Link href={`/${lng}/investor/gallery/photos`} className="explore-more">
                {(dict.home["view-gallery-btn"])}
                <span>
                  <Image 
                    src="https://contents.trinity-metals.com/wp-content/uploads/2025/02/arrow-icon.svg"
                    width={26} height={25} alt='' className={undefined}           />
                </span>
              </Link>
            </div>
          </div>
          
          <div className="media-sample">
            <div className="video-wrapper">
              <iframe  
                className="video-player-fromyoutbe"
                src="https://www.youtube.com/embed/aSxVT-MduHQ?controls=1&modestbranding=1&showinfo=0&rel=0&fs=0"
                frameBorder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                title="YouTube Video"
                loading="lazy"
              />
            </div>
            
            <div className="image-wrapper">
              <ImageLightBox
                  
                images={BottomImagesGallery} 
                renderImage={""}
              />
            </div>
          </div>
        </div>
      </div>

     </>
    
  );
}

