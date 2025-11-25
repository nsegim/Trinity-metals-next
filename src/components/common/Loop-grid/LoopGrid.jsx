"use client"

import React, { useState, useCallback, useMemo, Suspense } from "react";
import './styles.css';
import Carousel from 'react-bootstrap/Carousel';
import { usePosts } from "@/hooks/usePosts";

// Lazy load ReUsablePost with better error handling
const ReUsablePost = React.lazy(() => 
  import('../../common/ReUsablePost').catch(() => ({
    default: () => <div>Failed to load component</div>
  }))
);

// Loading skeleton component for better reusability
const LoadingSkeleton = ({ itemsPerPage }) => (
  <div className="grid article">
    {Array.from({ length: itemsPerPage }).map((_, itemIndex) => (
      <div key={itemIndex} className="grid-item loading-skeleton">
        <div className="skeleton-image"></div>
        <div className="skeleton-text short"></div>
        <div className="skeleton-text long"></div>
        <div className="skeleton-text medium"></div>
      </div>
    ))}
  </div>
);

// Error fallback component
const ErrorState = ({ message, onRetry }) => (
  <div className="error-state" style={{ 
    padding: '40px', 
    textAlign: 'center',
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <p style={{ marginBottom: '20px', color: '#dc3545' }}>
      {message || 'Failed to load posts. Please try again later.'}
    </p>
    {onRetry && (
      <button 
        onClick={onRetry}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Retry
      </button>
    )}
  </div>
);

const LoopGrid = ({ itemsPerPage = 3 }) => {
  const { data, isLoading, error, refetch } = usePosts();
  const [activeIndex, setActiveIndex] = useState(0);

  // Memoized carousel items calculation
  const carouselItems = useMemo(() => {
    if (!data || data.length === 0) return [];

    const totalPages = Math.ceil(data.length / itemsPerPage);
    
    return Array.from({ length: totalPages }).map((_, pageIndex) => {
      const startIndex = pageIndex * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const pageItems = data.slice(startIndex, endIndex);
      return (
        <Carousel.Item 
          key={pageIndex} 
          style={{ minHeight: "300px" }}
        >
          <div className="grid article">
            <Suspense fallback={<LoadingSkeleton itemsPerPage={itemsPerPage} />}>
              {pageItems.map((item) => (
                <ReUsablePost
                  key={item.id}
                  item={item}
                />
              ))}
            </Suspense>
          </div>
        </Carousel.Item>
      );
    });
  }, [data, itemsPerPage]);

  // Optimized carousel handler
  const handleSelected = useCallback((selectedIndex) => {
    setActiveIndex(selectedIndex);
  }, []);

  // Handle retry
  const handleRetry = useCallback(() => {
    refetch?.();
  }, [refetch]);

  // Loading state
  if (isLoading) {
    return (
      <div style={{ minHeight: "300px", padding: "20px" }}>
        <LoadingSkeleton itemsPerPage={itemsPerPage} />
      </div>
    );
  }

  // Error state
  if (error) {
    return <ErrorState message={error.message} onRetry={handleRetry} />;
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center',
        minHeight: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <p>No posts available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="loop-grid-container">
      <Carousel 
        className="article-carousel"
        activeIndex={activeIndex} 
        onSelect={handleSelected} 
        interval={5000}
        pause="hover"
        touch={true}
        style={{ paddingBottom: "60px" }}
        // controls={carouselItems.length > 1}
        controls={false}
        indicators={carouselItems.length > 1}
      >
        {carouselItems}
      </Carousel>
      
      {/* Optional: Page indicator */}
      {carouselItems.length > 1 && (
        <div style={{ 
          textAlign: 'center', 
          marginTop: '10px',
          fontSize: '14px',
          color: '#666'
        }}>
          {activeIndex + 1} / {carouselItems.length}
        </div>
      )}
    </div>
  );
};

export default LoopGrid;
