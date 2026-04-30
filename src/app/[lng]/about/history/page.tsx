// 'use client';
// import { useTranslation } from '@/app/context/TranslationContext';
import { getDictionary } from '@/app/i18n/dictionaries';
 import { Locale } from '@/app/i18n/config';
 import '../styles.css';

import ImageGallery from '@/components/common/ImageGallery';


export default async function History({
      params,   
  }: {
      params: Promise<{ lng: Locale }>;
  }) {
    //   const { dict, lang } = useTranslation();
      const { lng } = await params;

    const dict = await getDictionary(lng); // Default to English for server-side rendering
    
  return (
    <>
       {/* Hero */}
      <div className="about-hero-section history-hero">
        <div className="inner-wrapper">
          <h1 className="heading text-uppercase">{dict['about-us-page']?.['about-us-subpage-history']}</h1>
        </div>
      </div>
      {/* History */}
      <div className="container history-section-wrapper"  id="our-history">
        <div className="row justify-content-center align-items-center">
          {/* <div className="col-md-6 image-holder">
            <ImageGallery
              imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/06/tyu.webp"
              customClass="history-image"
              height={494}
              alt={undefined}
              width={610}
              imageName="Nyakabingo site"
            />
          </div> */}
          <div className="col-md-6 histort-content-holder">
            <div className="content-holder">
              <h2 className="section-heading">{dict['about-us-page']?.['our-history-section-title']}</h2>
             
              <div className="text-content">
                    <p className="fw-bold">{dict['about-us-page']?.['our-history-popup-top-desc']}</p>
                    <p>{dict['about-us-page']?.['our-history-popup-desc']}</p>
                    <p>{dict['about-us-page']?.['our-history-popup-desc1']}</p>
                    <p>{dict['about-us-page']?.['our-history-popup-desc2']}</p>
             </div>
              
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
