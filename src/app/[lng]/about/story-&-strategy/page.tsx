import React from 'react'
import { getDictionary } from '@/app/i18n/dictionaries';
 import { Locale } from '@/app/i18n/config';
 import '../styles.css';
import ImageGallery from '@/components/common/ImageGallery';

export default async function StoryStrategy({
      params,   
  }: {
      params: Promise<{ lng: Locale }>;
  }) {
    //   const { dict, lang } = useTranslation();
      const { lng } = await params;

    const dict = await getDictionary(lng); 
    //   const { dict, lang } = useTranslation();
  return (
    <>
         {/* Hero */}
        <div className="about-hero-section story-strategy-hero">
            <div className="inner-wrapper">
            <h1 className="heading text-uppercase">{dict['about-us-page']?.['about-us-subpage-title-story-strategy']}</h1>
            </div>
        </div>
        {/* Mission & Vision */}
             <div className="container our-values-wrapper">
               <div className="row justify-content-between">
                 <div className="col-md-6 our-mission d-flex justify-content-center align-items-center flex-column">
                   <div className="icon-box">
                     <div className="icon d-flex justify-content-center">
                       <ImageGallery
                         imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Our_mission-icon.svg"
                         height={73}
                         width={73}
                         imageName="Our Mission Icon"
                         customClass="Our-mission-photo"
                         alt={undefined}
                       />
                     </div>
                     <div className="icon-box-header">
                       <p className="text-001">{dict['about-us-page']?.['our-mission-title']}</p>
                     </div>
                   </div>
                   <div className="icon-box-description d-flex justify-content-center">
                     <p className="text-description text-center">{dict['about-us-page']?.['our-mission-description']}</p>
                   </div>
                 </div>
                 <div className="col-md-6 our-vision d-flex justify-content-center align-items-center flex-column">
                   <div className="icon-box">
                     <div className="icon d-flex justify-content-center">
                       <ImageGallery
                         imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Our_vision-icon.svg"
                         height={73}
                         alt={undefined}
                         width={73}
                         imageName="Our Vision Icon"
                         customClass="Our-vision-icon"
                       />
                     </div>
                     <div className="icon-box-text">
                       <p className="text-001">{dict['about-us-page']?.['our-vision-title']}</p>
                     </div>
                   </div>
                   <div className="icon-box-description d-flex justify-content-center">
                     <p className="text-description text-center">{dict['about-us-page']?.['our-vision-description']}</p>
                   </div>
                 </div>
               </div>
             </div>
       
             {/* Values */}
             <div className="values-section py-5" id="our-values" >
               <div className="container our-values-holder">
                 <div className="inner-contentWrapper">
                   <div className="trinity-heading">
                     <h2 className="section-heading0002">{dict['about-us-page']?.['our-values-section-title']}</h2>
                   </div>
                   <div className="grid-wrapper">
                     <div className="the-grid-item">
                       <div className="the-icon-box">
                         <div className="the-iconbox-icon">
                           <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/LightBulb.svg" alt={undefined} height={47} width={46} imageName="We Empower Icon" customClass="Our-impact-icon" />
                         </div>
                         <div className="iconbox-content-wrapper">
                           <div className="icon-box-header"><p>{dict['about-us-page']?.['we-empower']}</p></div>
                           <div className="icon-box-description"><p>{dict['about-us-page']?.['we-empower-description']}</p></div>
                         </div>
                       </div>
                     </div>
                     <div className="the-grid-item">
                       <div className="the-icon-box">
                         <div className="the-iconbox-icon">
                           <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Watch-icon.svg" height={47} width={46} imageName="We Do No Harm Icon" alt={undefined} customClass="Our-impact-icon" />
                         </div>
                         <div className="iconbox-content-wrapper">
                           <div className="icon-box-header"><p>{dict['about-us-page']?.['we-do-no-warm']}</p></div>
                           <div className="icon-box-description"><p>{dict['about-us-page']?.['we-do-no-warm-description']}</p></div>
                         </div>
                       </div>
                     </div>
                     <div className="the-grid-item">
                       <div className="the-icon-box">
                         <div className="the-iconbox-icon">
                           <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/User-icon.svg" height={47} width={46} imageName="We Set Standard Icon" alt={undefined} customClass="Our-impact-icon" />
                         </div>
                         <div className="iconbox-content-wrapper">
                           <div className="icon-box-header"><p>{dict['about-us-page']?.['we-set-standard']}</p></div>
                           <div className="icon-box-description"><p>{dict['about-us-page']?.['we-set-standard-description']}</p></div>
                         </div>
                       </div>
                     </div>
                     <div className="the-grid-item">
                       <div className="the-icon-box">
                         <div className="the-iconbox-icon">
                           <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/trophy-icon.svg" height={47} width={46} imageName="Accountability Icon" customClass="Our-impact-icon" alt={undefined} />
                         </div>
                         <div className="iconbox-content-wrapper">
                           <div className="icon-box-header"><p>{dict['about-us-page']?.['we-hold-ourselves-accountable']}</p></div>
                           <div className="icon-box-description"><p>{dict['about-us-page']?.['we-hold-ourselves-accountable-description']}</p></div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
       
             {/* Strategies */}
             <div className="strategies-section d-flex justify-content-center flex-column" id="our-strategies">
               <div className="inner-container container">
                 <div className="top-content d-flex justify-content-center align-items-center flex-column">
                   <div className="text-heading">
                     <h2>{dict['about-us-page']?.['our-strategy-section-title']}</h2>
                   </div>
                   <div className="text-content-inner">
                     <p>{dict['about-us-page']?.['our-strategy-section-description']}</p>
                   </div>
                 </div>
                 <div className="grid-container">
                   <div className="the-grid-item">
                     <div className="the-icon-box">
                       <div className="the-iconbox-icon">
                         <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Hammer-icon.svg" customClass="strategy-icon" height={70} width={71} alt={undefined} imageName="Business Strategy Icon" />
                       </div>
                       <div className="iconbox-content-wrapper">
                         <div className="icon-box-header"><p className="text-center">{dict['about-us-page']?.['our-strategies-business']}</p></div>
                         <div className="icon-box-description"><p className="text-center">{dict['about-us-page']?.['our-strategies-business-description']}</p></div>
                       </div>
                     </div>
                   </div>
                   <div className="the-grid-item">
                     <div className="the-icon-box">
                       <div className="the-iconbox-icon">
                         <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/group-icon.svg" customClass="strategy-icon" height={70} width={71} imageName="People Strategy Icon" alt={undefined}/>
                       </div>
                       <div className="iconbox-content-wrapper">
                         <div className="icon-box-header"><p className="text-center">{dict['about-us-page']?.['our-strategies-people']}</p></div>
                         <div className="icon-box-description"><p className="text-center">{dict['about-us-page']?.['our-strategies-people-description']}</p></div>
                       </div>
                     </div>
                   </div>
                   <div className="the-grid-item">
                     <div className="the-icon-box">
                       <div className="the-iconbox-icon">
                         <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/intersection-cion.svg" customClass="strategy-icon" height={70} width={71} imageName="Relationships Strategy Icon" alt={undefined} />
                       </div>
                       <div className="iconbox-content-wrapper">
                         <div className="icon-box-header"><p className="text-center">{dict['about-us-page']?.['our-strategies-relationships']}</p></div>
                         <div className="icon-box-description"><p className="text-center">{dict['about-us-page']?.['our-strategies-relationships-description']}</p></div>
                       </div>
                     </div>
                   </div>
                   <div className="the-grid-item">
                     <div className="the-icon-box">
                       <div className="the-iconbox-icon">
                         <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/qlementine-icons_build-16.svg" customClass="strategy-icon" height={70} width={71} imageName="Future Strategy Icon" alt={undefined} />
                       </div>
                       <div className="iconbox-content-wrapper">
                         <div className="icon-box-header"><p className="text-center">{dict['about-us-page']?.['our-strategies-future']}</p></div>
                         <div className="icon-box-description"><p className="text-center">{dict['about-us-page']?.['our-strategies-future-description']}</p></div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
       
    </>
  )
}
