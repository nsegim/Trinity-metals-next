
"use client"
import React, { memo, useMemo } from 'react';
import moment from 'moment/min/moment-with-locales';
import DOMPurify from 'dompurify';
import Link from "next/link"
import { useTranslation } from 'react-i18next';

// Optimized ImageGallery with lazy loading
const OptimizedImageGallery = memo(({ imageUrl, customClass, alt = "", loading = "lazy" }) => {
  return (
    <img
      src={imageUrl}
      alt={alt}
      className={customClass}
      loading={loading}
      decoding="async"
    />
  );
});

// Default placeholder image - use a small base64 or simple SVG
const DEFAULT_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+';

const ReUsablePost = memo(({ item, categories, postImages }) => {
  const { t, i18n } = useTranslation();

  // Memoized sanitized content renderer
  const reRenderContent = useMemo(() => {
    return (content) => {
      if (!content) return null;
      const safeContent = DOMPurify.sanitize(content);
      return <div className="article-content" dangerouslySetInnerHTML={{ __html: safeContent }} />;
    };
  }, []);

  // Memoized formatted date
  const formattedDate = useMemo(() => {
    if (!item?.date) return '';
    return moment(item.date).locale(moment.locale()).format(t("home.date_format"));
  }, [item?.date, t]);

  // Memoized category name
  const categoryName = useMemo(() => {
    return categories?.[item?.id] || 'Loading...';
  }, [categories, item?.id]);

  // Memoized image URL
  const imageUrl = useMemo(() => {
    return postImages?.[item?.id] || DEFAULT_PLACEHOLDER;
  }, [postImages, item?.id]);

  // Memoized link component
  const ReadMoreLink = useMemo(() => {
    if (!item) return null;

    const hasContent = item?.content?.rendered !== "";
    const isExternalLink = !hasContent && item?.meta?._links_to;
    
    if (isExternalLink) {
      return (
        <a
          href={item.meta._links_to}
          target="_blank"
          rel="noopener noreferrer"
          className="read-more-btn"
        >
          <span>{t("home.read-more-button")}</span>
        </a>
      );
    } else if (hasContent) {
      return (
        <Link href={`/single-post/${item.id}`}>
          <span>{t("home.read-more-button")}</span>
        </Link>
      );
    }
    
    return null;
  }, [item, t]);

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
      <img
        src={`${imageUrl}.webp`}
        alt={item?.title?.rendered ? `Image for ${item.title.rendered}` : 'Post image'}
        className="featured-image"
        loading="lazy"
        decoding="async"
        onError={(e) => {
          // Fallback if image fails to load
          if (e.target.src !== DEFAULT_PLACEHOLDER) {
            e.target.src = DEFAULT_PLACEHOLDER;
          }
        }}
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
              loading="lazy"
            />
            <span className="category">
              {categoryName}
            </span>
          </div>
          <div className="read-more-btn-wrapper">
            {ReadMoreLink}
          </div>
        </div>
      </div>
    </div>
  );
});

// Display name for better debugging
ReUsablePost.displayName = 'ReUsablePost';
OptimizedImageGallery.displayName = 'OptimizedImageGallery';

export default ReUsablePost;