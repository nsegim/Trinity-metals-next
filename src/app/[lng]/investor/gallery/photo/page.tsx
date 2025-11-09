// app/gallery/photos/page.tsx
'use client';

import { useEffect, useState, useRef } from "react";
import ImageGallery from "@/components/common/ImageGallery";
import Spinner from "@/components/ui/Spinner/Spinner";

import { fetchData } from "../../../../../../lib/config/apiConfig";
import { useTranslation } from "@/app/context/TranslationContext";
import "../styles.css";

interface GalleryImage {
  link: string;
  text: string;
}

export default function PhotoGallery() {
  const { dict } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("Tab1");
  const [allImages, setAllImages] = useState<GalleryImage[][]>([]);
  const [All, setAll] = useState<GalleryImage[]>([]);
  const [Sports, setSports] = useState<GalleryImage[]>([]);
  const [Events, setEvents] = useState<GalleryImage[]>([]);
  const [Visitors, setVisitors] = useState<GalleryImage[]>([]);
  const [selectedGallery, setSelectedGallery] = useState<GalleryImage[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 16;

  // Fetch gallery
  useEffect(() => {
    let isMounted = true;
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        const response = await fetchData("gallery?per_page=100&_embed");
        if (isMounted && response?.length) {
          const images = response.map((item: any) =>
            item?._embedded?.["acf:attachment"]?.map((subItem: any) => ({
              link: subItem?.source_url || "",
              text: "Gallery Image",
            })) || []
          );
          setAllImages(images);
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchGalleryData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Process images
  useEffect(() => {
    if (allImages.length === 0) return;
    const flattened = allImages.flat();
    setAll(flattened.slice().reverse());
    setSports(allImages[0]?.slice().reverse() || []);
    setEvents(allImages[3]?.slice().reverse() || []);
    setVisitors(allImages[2]?.slice().reverse() || []);
    setSelectedGallery(flattened.slice().reverse()); // default: All
  }, [allImages]);

  // Filter handler
  const handleFilterClick = (tab: string, filter: string) => {
    setActiveFilter(tab);
    const galleries: { [key: string]: GalleryImage[] } = {
      all: All,
      sports: Sports,
      events: Events,
      visitors: Visitors,
    };
    setSelectedGallery(galleries[filter] || All);
    setCurrentPage(1);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = selectedGallery.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(selectedGallery.length / itemsPerPage);

  // Scroll to top
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  const tabs = [
    { key: "all", label: "Tabs.all" },
    { key: "visitors", label: "Tabs.visitors" },
    { key: "events", label: "Tabs.events" },
    { key: "sports", label: "Tabs.sports" },
  ];

  return (
    <>
      {/* <Helmet>
        <title>Gallery – Photos | Trinity Metals Limited</title>
        <meta
          name="description"
          content="Explore photos from Trinity Metals’ mining projects and community initiatives across Rwanda, showcasing responsible mining and sustainable development in action."
        />
        <meta property="og:title" content="Gallery – Photos | Trinity Metals Limited" />
        <meta
          property="og:description"
          content="Explore photos from Trinity Metals’ mining projects and community initiatives across Rwanda, showcasing responsible mining and sustainable development in action."
        />
        <meta property="og:url" content="https://trinity-metals.com/investor-relations/gallery/photos" />
        <link rel="canonical" href="https://trinity-metals.com/investor-relations/gallery/photos" />
      </Helmet> */}


      {/* Hero */}
      <div className="custom-hero photo-gallery">
        <div className="child-item-wrapper z-1">
          <h1 className="heading text-uppercase">{t("gallery.photos")}</h1>
        </div>
      </div>

      {/* Navigation */}
      <div className="gallery-navigation">
        <div className="gallery-nav-wrapper d-flex">
          <a href="/gallery/photos" className="gallery-nav visited">
            <img src="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Photo-icon.svg" alt="Photos" />
            <span>{t("gallery.photo-gallery")}</span>
          </a>
          <a href="/gallery/videos" className="gallery-nav">
            <img src="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Video-icon.svg" alt="Videos" />
            <span>{t("gallery.video-gallery")}</span>
          </a>
        </div>
      </div>

      {/* Gallery */}
      <div className="photo-gallery-wrapper" ref={scrollRef}>
        <div className="photo-gallery-container container">

          {/* Filters */}
          <div className="photo-gallery-filters">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleFilterClick(`Tab${index + 1}`, tab.key)}
                className={`filter-title ${activeFilter === `Tab${index + 1}` ? "active-button" : ""}`}
              >
                {t(tab.label)}
              </button>
            ))}
          </div>

          {/* Images */}
          <div className="photos-wrapper">
            {loading ? (
              <Spinner />
            ) : currentItems.length > 0 ? (
              <ImageLightBox
                images={currentItems}
                renderImage={(images, handleClick) => (
                  <div className="photo-category All">
                    {images.map((item, index) => (
                      <div key={index} className="image-grid">
                        <ImageGallery imageUrl={item.link} customClass="gallery-img" />
                        <div className="view-image" onClick={() => handleClick(item, index)}>
                          <ImageGallery
                            imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/View-button.svg"
                            customClass="play-video-player"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              />
            ) : (
              <p className="text-center">No images found.</p>
            )}
          </div>

          {/* Pagination */}
          {selectedGallery.length > itemsPerPage && (
            <div className="pagination">
              <button
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Vector.svg" />
              </button>

              <div className="page-numbers-wrapper">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <span
                    key={page}
                    className={`page-number ${currentPage === page ? "active" : ""}`}
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
                <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Vector-1-1.svg" />
              </button>
            </div>
          )}
        </div>
      </div>

    </>
  );
}