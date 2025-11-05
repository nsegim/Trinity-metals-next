"use client"
import { useState, useEffect, useCallback, useMemo, lazy } from "react";
import './styles.css'
import Carousel from 'react-bootstrap/Carousel';
import { fetchData } from "../../../../lib/config/apiConfig";
import Spinner from "../../ui/Spinner/Spinner";

// Lazy load ReUsablePost
const ReUsablePost = lazy(() => import('../../common/ReUsablePost'));
import { usePostsData } from "@/hooks/usePostsData";

const LoopGrid = ({ itemsPerPage = 3, posts }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data, categories, postImages, error, loading, getPosts } = usePostsData();

  // Fetch data on mount
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  // Memoized carousel items calculation
  const carouselItems = useMemo(() => {
    if (loading || data.length === 0) {
      return Array.from({ length: Math.min(3, data.length || 3) }).map((_, index) => (
        <Carousel.Item key={index} style={{ minHeight: "300px" }}>
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
        </Carousel.Item>
      ));
    }

    const totalPages = Math.ceil(data.length / itemsPerPage);
    
    return [...Array(totalPages)].map((_, pageIndex) => {
      const startIndex = pageIndex * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const pageItems = data.slice(startIndex, endIndex);

      return (
        <Carousel.Item 
          key={pageIndex} 
          style={{ minHeight: "300px" }}
        >
          <div className={`grid article`}>
            {pageItems.map((item) => (
              <ReUsablePost
                key={item.id}
                item={item}
                categories={categories}
                postImages={postImages}
              />
            ))}
          </div>
        </Carousel.Item>
      );
    });
  }, [data, categories, postImages, loading, itemsPerPage]);

  // Optimized carousel handler
  const handleSelected = useCallback((selectedIndex) => {
    setActiveIndex(selectedIndex);
  }, []);

  if (error) {
    return (
      <div className="error-state">
        <div>Failed to load posts. Please try again later.</div>
      </div>
    );
  }

  return (
    <div>
      
      <Carousel 
        className="article-carousel"
        activeIndex={activeIndex} 
        onSelect={handleSelected} 
        interval={5000} 
        style={{ 
         
          paddingBottom: "60px" 
        }}
        controls={false}        
      >
        {carouselItems}
      </Carousel>
    </div>
  );
};

export default LoopGrid;