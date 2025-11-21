// app/[lng]/investor-relations/latest-news/ClientLatestNews.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import SideBar from '@/components/layout/SideBar/SideBar';
import ReUsablePost from '@/components/common/ReUsablePost';
import ImageGallery from '@/components/common/ImageGallery';
import { fetchData } from '../../../../../lib/config/apiConfig';
import { useTranslation } from '@/app/context/TranslationContext';
import Spinner from '@/components/ui/Spinner/Spinner';

const ClientLatestNews = ({ lng }: { lng: string }) => {
  const { dict, lang } = useTranslation();
  const currentLang = lang || lng;

  const [data, setData] = useState<any[]>([]);
  const [categories, setCategories] = useState<{ [key: number]: string }>({});
  const [postImages, setPostImages] = useState<{ [key: number]: string }>({});
  const [error, setError] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const itemsPerPage = 8;
  const myRef = useRef<HTMLDivElement>(null);

  // Fetch all posts
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetchData('posts?_embed&per_page=100');
        setData(response || []);
        setFilteredPosts(response || []);
      } catch (err) {
        setError(err);
        console.error('Error fetching posts:', err);
      }
    };
    getPosts();
  }, []);

  // Fetch categories & images
  useEffect(() => {
    if (data.length === 0) return;

    data.forEach(async (item) => {
      // Category
      if (item?.categories?.[0]) {
        try {
          const cat = await fetchData(`categories/${item.categories[0]}`);
          setCategories((prev) => ({ ...prev, [item.id]: cat?.name || 'Uncategorized' }));
        } catch (err) {
          console.error('Category fetch error:', err);
        }
      }

      // Featured image
      if (item?.featured_media) {
        try {
          const media = await fetchData(`media/${item.featured_media}`);
          const imgUrl = media?.media_details?.sizes?.large?.source_url ||
                        media?.media_details?.sizes?.full?.source_url ||
                        media?.source_url;
          setPostImages((prev) => ({ ...prev, [item.id]: imgUrl }));
        } catch (err) {
          console.error('Image fetch error:', err);
        }
      }
    });
  }, [data]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Smooth scroll on page change
  useEffect(() => {
    myRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentPage]);

  

  if (error) {
    return <div className="container py-5 text-center">Error loading news. Please try again later.</div>;
  }

  return (
    <>
      {/* Hero */}
      <div className="custom-hero">
        <div className="child-item-wrapper z-1">
          <h1 className="heading text-uppercase">
            {dict['latest-news']?.['latest-news-page-title']}
          </h1>
        </div>
      </div>

      {/* News Grid + Sidebar */}
      <div className="latest-news-wrapper" ref={myRef}>
        <div className="container">
          <div className="row">
            {/* Posts Grid */}
            <div className="col-md-8">
              {data.length === 0 ? (
                <div className="d-flex justify-content-center py-5">
                  <Spinner />
                </div>
              ) : currentItems.length === 0 ? (
                <div className="text-center py-5">
                  <h3>{dict['latest-news']?.['no-posts'] || 'No news found'}</h3>
                </div>
              ) : (
                <div className="grid article latest-news">
                  {currentItems.map((item, index) => (
                    <ReUsablePost
                      key={item.id}
                      item={item}
                      categories={categories}
                      postImages={postImages}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Vector.svg" 
                    height={15}
                    width={8}
                    customClass="arrow-left"
                    imageName="arrow icon"
                    alt={undefined}
                    />
                  </button>

                  <div className="page-numbers-wrapper">
                    {pageNumbers.map((page) => (
                      <span
                        key={page}
                        className={`page-number ${currentPage === page ? 'active' : ''}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </span>
                    ))}
                  </div>

                  <button
                    className="pagination-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Vector-1-1.svg"
                     height={15}
                    width={8}
                    customClass="arrow-right"
                    imageName="arrow icon"
                    alt={undefined}
                    />
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="col-md-4">
              <SideBar
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientLatestNews;