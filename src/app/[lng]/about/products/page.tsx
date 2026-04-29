import React from 'react'
import { getDictionary } from '@/app/i18n/dictionaries';
 import { Locale } from '@/app/i18n/config';
 import '../styles.css';
import ImageGallery from '@/components/common/ImageGallery';

export default async function Products({
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
        <div className="about-hero-section products-hero">
            <div className="inner-wrapper">
            <h1 className="heading text-uppercase">{dict['about-us-page']?.['about-us-subpage-title-products']}</h1>
            </div>
        </div>

        {/* Products */}
        <div className="container our-products-section" id="our-products">
          <div className="first-container">
            <div className="header-part">
              <h2 className="section-heading">{dict['about-us-page']?.['our-product-section-title']}</h2>
            </div>
            <div className="description-part">
              <p className="description-text">{dict['about-us-page']?.['our-product-section-description']}</p>
            </div>
          </div>
          <div className="second-container d-flex">
            <div className="single-product">
              <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Tin.svg" customClass="product-image" height={218} width={412} imageName="Tin Product" alt={undefined}/>
              <div className="product-desc">
                <div className="product-name"><p>{dict['about-us-page']?.['our-product-TIN']}</p></div>
                <hr className="custom-divider" />
                <div className="product-description"><p className="description-text">{dict['about-us-page']?.['our-product-TIN-description']}</p></div>
              </div>
            </div>
            <div className="single-product">
              <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Tantalum.svg" customClass="product-image" height={218} width={412} imageName="Tantalum Product" alt={undefined} />
              <div className="product-desc">
                <div className="product-name"><p>{dict['about-us-page']?.['our-product-TANTALUM']}</p></div>
                <hr className="custom-divider" />
                <div className="product-description"><p className="description-text">{dict['about-us-page']?.['our-product-TANTALUM-description']}</p></div>
              </div>
            </div>
            <div className="single-product">
              <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Tangusten.svg" customClass="product-image" height={218} width={412} imageName="Tungsten Product" alt={undefined} />
              <div className="product-desc">
                <div className="product-name"><p>{dict['about-us-page']?.['our-product-TUNGSTEN']}</p></div>
                <hr className="custom-divider" />
                <div className="product-description"><p className="description-text">{dict['about-us-page']?.['our-product-TUNGSTEN-description']}</p></div>
              </div>
            </div>
          </div>
        </div>

    </>
  )
}
