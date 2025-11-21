// src/components/common/ReUsablePost.tsx
"use client";

import React, { memo, useMemo } from 'react';
import moment from 'moment/min/moment-with-locales';
import DOMPurify from 'dompurify';
import Link from "next/link";
import { useTranslation } from '../../app/context/TranslationContext';
import { getFeaturedImage } from '@/lib/extract';
import ImageGallery from './ImageGallery';

// Optimized ImageGallery with lazy loading
const OptimizedImageGallery = memo(({ 
  imageUrl, 
  imageName,
  customClass, 
  alt = "", 
  width,
  height
}: { 
  imageUrl: string; 
  imageName?: string;
  customClass?: string; 
  alt?: string; 
   width?: number;
  height?: number
}) => {
  return (
    <ImageGallery
      imageUrl={imageUrl}
      alt={alt}
      imageName={imageName}
      customClass={customClass}
      width={width}
      height={height}
      
    />
  );
});


// Default placeholder image
const DEFAULT_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+';

// Define Props Interface
interface ReUsablePostProps {
  item: any;
  categories: { [key: number]: string };
  postImages: { [key: number]: string };
}

const ReUsablePost = memo(({ item, categories, postImages }: ReUsablePostProps) => {
  const { dict, lang } = useTranslation();

  // Memoized sanitized content renderer
  const reRenderContent = useMemo(() => {
    return (content: string) => {
      if (!content) return null;
      const safeContent = DOMPurify.sanitize(content);
      return <div className="article-content" dangerouslySetInnerHTML={{ __html: safeContent }} />;
    };
  }, []);

  // Memoized formatted date
  const formattedDate = useMemo(() => {
    if (!item?.date) return '';
    return moment(item.date).locale(moment.locale()).format(dict.home?.["date_format"] || 'MMMM D, YYYY');
  }, [item?.date, dict]);

  // Memoized category name
  const categoryName = useMemo(() => {
    categories =  item?._embedded?.['wp:term'][0][0]?.name || 'Loading...';
    return categories
  }, [categories, item?.id]);
  


  // Memoized image URL
  const imageUrl = getFeaturedImage(item)

  // Memoized link component
  const ReadMoreLink = useMemo(() => {
    if (!item) return null;
    const hasContent = item?.content?.rendered && item.content.rendered !== "";
    const isExternalLink = !hasContent && item?.meta?._links_to;

    if (isExternalLink) {
      return (
        <a
          href={item.meta._links_to}
          target="_blank"
          rel="noopener noreferrer"
          className="read-more-btn"
        >
          <span>{dict.home?.["read-more-button"] || 'Read More'}</span>
        </a>
      );
    } else if (hasContent) {
      return (
        <Link href={`/${lang}/post/${item.slug}`} className="read-more-btn">
          <span>{dict.home?.["read-more-button"] || 'Read More'}</span>
        </Link>
      );
    }
    return null;
  }, [item, dict]);

  // Early return if no item
  if (!item) {
    return (
      <div className="grid-item">
        <div className="loading-state">Loading post...</div>
      </div>
    );
  }

  return (
    <div className="grid-item">
      <ImageGallery
        imageUrl={`${imageUrl}.webp`}
        alt={item?.title?.rendered ? `Image for ${DOMPurify.sanitize(item.title.rendered)}` : 'Post image'}
        customClass={'featured-image'}
        width={413}
        height={390}
        imageName={item?.title?.rendered ? DOMPurify.sanitize(item.title.rendered) : 'Post image'}
        // onError={(e) => {
        //   const target = e.target as HTMLImageElement;
        //   if (target.src !== DEFAULT_PLACEHOLDER) {
        //     target.src = DEFAULT_PLACEHOLDER;
        //   }
        // }}

        // width={413}
        // height={390}

      />
      <p className="article_date">{formattedDate}</p>
      <div className="rt-holder">
        <h2 className="article-title">
          {reRenderContent(item?.title?.rendered)}
        </h2>
        <div className="card-bottom-elements">
          <div className="category-holder">
            <OptimizedImageGallery
              imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Category-Icon.svg"
              customClass="category-icon"
              alt="Category"
               width={19}
              height={18}
           
            />
            <span className="category">{categoryName}</span>
          </div>
          <div className="read-more-btn-wrapper">
            {ReadMoreLink}
          </div>
        </div>
      </div>
    </div>
  );
});

// Display name for debugging
ReUsablePost.displayName = 'ReUsablePost';
OptimizedImageGallery.displayName = 'OptimizedImageGallery';

export default ReUsablePost;