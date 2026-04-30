'use client'
import '../styles.css';
import { useTranslation } from '@/app/context/TranslationContext';
import ImageGallery from '@/components/common/ImageGallery';
import Link from 'next/link';



export default function Governance() {
  const { dict, lang } = useTranslation();
  

  return (
    <>
      {/* Hero */}
      {/* <div className="about-hero-section products-hero">
        <div className="inner-wrapper">
          <h1 className="heading text-uppercase">
            {dict['about-us-page']?.['about-us-subpage-title-governance']}
          </h1>
        </div>
      </div> */}

      
       {/* Governance */}
        <div className="the-project-hero-section-wrapper Governance-section"></div>
        <div className="project-content-wrapper pb-5">
          <div className="container d-flex justify-content-center">
            <div className="information-project">
              <div className="project-title-element">
                <h2>{dict['Sustainability']?.['governance']}</h2>
                <div className="project-brief2 pt-3">
                  <h4>{dict['Sustainability']?.['governance-subtitle1']}</h4>
                  <p>{dict['Sustainability']?.['governance-desc1']}</p>
                  <h4>{dict['Sustainability']?.['governance-subtitle2']}</h4>
                  <p>{dict['Sustainability']?.['governance-desc2']}</p>
                  <h4>{dict['Sustainability']?.['governance-subtitle3']}</h4>
                  <p>{dict['Sustainability']?.['governance-desc3']}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}