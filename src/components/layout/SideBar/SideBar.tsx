// components/layout/SideBar/SideBar.tsx
'use client';

import { useEffect, useState, useMemo } from 'react';
import ImageGallery from '@/components/common/ImageGallery';
import ImageLightBox from '@/components/features/LightBox/ImageLightBox';
import Spinner from '@/components/ui/Spinner/Spinner';
import { fetchData } from '../../../../lib/config/apiConfig';
import { useTranslation } from '@/app/context/TranslationContext';
import Link from 'next/link';
import moment from 'moment';
import './SideBar.css';
import { getFeaturedImage } from '@/lib/extract';

// Props

const SideBar = () => {
  const { dict, lang } = useTranslation();

  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [allImages, setAllImages] = useState<any[]>([]);
  const [All, setAll] = useState<any[]>([]);
  const [isSinglePost, setIsSinglePost] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');

  // === FETCH RELATED POSTS ===
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetchData('posts?_embed&per_page=100');
        setRelatedPosts(response || []);
      } catch (error) {
        console.error('Error fetching related posts:', error);
      }
    };
    fetchPosts();
  }, []);

  // === FETCH FEATURED IMAGES ===

  // === FETCH GALLERY ===
  useEffect(() => {
    let isMounted = true;
    const fetchGalleryData = async () => {
      try {
        const response = await fetchData('gallery?per_page=12&_embed');
        if (isMounted && response?.length) {
          setGallery(response);
          const images = response.map((item: any) =>
            item?._embedded?.['acf:attachment']?.map((subItem: any) => ({
              link: subItem?.source_url || '',
              text: 'Gallery Image',
            })) || []
          );
          setAllImages(images);
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
      }
    };
    fetchGalleryData();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (allImages.length === 0) return;
    const flattened = allImages.flat();
    setAll(flattened.reverse().slice(0, 12));
  }, [allImages]);

  // === DETECT SINGLE POST PAGE ===
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      setIsSinglePost(path.includes(`/${lang}/post`) || path.includes('/post/'));
    }
  }, [lang]);

  // === FILTER & LIMIT POSTS WITH CONTENT (MAX 3) ===
  const featuredPostsWithContent = useMemo(() => {
    if (!Array.isArray(relatedPosts) || relatedPosts.length === 0) return [];

    return relatedPosts
      .filter((post) => {
        const content = post?.content?.rendered;
        return content && content.trim() !== "" && content !== "<p></p>";
      })
      .slice(0, 3);
  }, [relatedPosts]);

  // === SEARCH HANDLER (LOCAL ONLY) ===
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Search query:", searchQuery);
  };

  return (
    <div className="sidebar-wrapper">
      <div className="contain">
        <div className="side-bar-wrapper">

          {/* SEARCH */}
          <div className="about-posts-search">
            <div className="sidebar-headers">
              <h5>{dict['sidebar']?.['search1']}</h5>
            </div>
            <div className="search-form">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder={dict['sidebar']?.['search-input']}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">
                  <ImageGallery
                    imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Symbol-9.svg"
                    height={16}
                    width={16}
                    customClass="search-icon"
                    imageName="search Icon"
                  />
                </button>
              </form>
            </div>
          </div>

          {/* FEATURED POSTS (ONLY ON SINGLE POST PAGE) */}
          {isSinglePost && (
            <div className="about-featured-posts">
              <div className="featured-posts">
                <div className="sidebar-headers">
                  <h5>{dict['sidebar']?.['featured-posts']}</h5>
                </div>
                <div className="a-related-post">
                  {featuredPostsWithContent.length > 0 ? (
                    featuredPostsWithContent.map((item) => (
                      <div key={item.id} className="featured-post">
                        <div className="featured-image">
                          <ImageGallery
                            imageUrl={getFeaturedImage(item) || 'https://contents.trinity-metals.com/wp-content/uploads/2025/02/animated_loader_gif_n6b5x0.gif'}
                            customClass="related-featured-img"
                            height={62}
                            width={92}
                            imageName="Featured"
                          />
                        </div>
                        <div className="post-details">
                          <div className="post-title">
                            <Link href={`/${lang}/post/${item.slug}`}>
                              <p dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
                            </Link>
                          </div>
                          <div className="post-date">
                            <span>{moment(item.date).format('MMMM DD, YYYY')}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* NEWSLETTER */}
          <div className="about-newsletters">
            <div className="sidebar-headers">
              <h5>{dict['sidebar']?.['newsletter']}</h5>
            </div>
            <div className="newsletter-container">
              <h5 className="news-letter-header">
                {dict['sidebar']?.['newsletter-section']?.['section-title']}
              </h5>
              <div className="newsletter-form">
                <form className="subscribe-form">
                  <input
                    type="email"
                    placeholder={dict['sidebar']?.['newsletter-section']?.['input-field']}
                  />
                  <button type="submit">
                    {dict['sidebar']?.['newsletter-section']?.['subscribe-btn']}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* GALLERY */}
          <div className="about-gallery">
            <div className="sidebar-headers">
              <h5>{dict['sidebar']?.['our-gallery']}</h5>
            </div>
            <div className="categories-container">
              <div className="a-gallery sidebar-gallery">
                {All.length === 0 ? (
                  <Spinner />
                ) : (
                  <ImageLightBox
                    images={All}
                    renderImage={(images, handleClick) => (
                      <div className="the-gallery">
                        {images.map((item, index) => (
                          <div key={index} className="image-grid">
                            <ImageGallery
                              imageUrl={item.link}
                              customClass="gallery-img"
                              height={62}
                              width={92}
                              imageName="Gallery"
                            />
                            <div className="view-image" onClick={() => handleClick(item, index)}>
                              <ImageGallery
                                imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/View-button.svg"
                                customClass="play-video-player"
                                height={31}
                                width={30}
                                imageName="View"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SideBar;