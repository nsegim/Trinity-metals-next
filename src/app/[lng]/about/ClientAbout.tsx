// app/[lng]/about/ClientAbout.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Spinner from '@/components/ui/Spinner/Spinner';
import ImageGallery from '@/components/common/ImageGallery';
import Link from 'next/link';
import { fetchData } from '../../../../lib/config/apiConfig';
import { useTranslation } from '@/app/context/TranslationContext';

// Define interfaces based on the structure of your data
interface MemberData {
  id: number;
  tags?: number[]; 
  name: string; 
  // Add other properties that are present on your data objects here (e.g., image, title, etc.)
}

interface TagResponse {
  id: number;
  name: string;
}

// 1. Update ClientAboutProps to use MemberData[] instead of unknown[]
interface ClientAboutProps {
  initialData: MemberData[]; 
  initialError: unknown; // initialError might remain unknown if it can be anything
  lng: string;
}


const ClientAbout = ({ initialData, initialError, lng }: ClientAboutProps) => {
  // const pathname = usePathname();
  const { dict, lang } = useTranslation();
  const currentLang = lang || lng;
  const d = dict || {};

  // Refs — CORRECT
  const historyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const strategiesRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  // scrollToSection — CORRECT
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // ... (useEffect for window location hash remains the same) ...
  useEffect(() => { /* ... */ }, []);


  const [modalShow, setModalShow] = useState(false);
  const [activeModal, setActiveModal] = useState<number | null>(null);
  
  // 2. Type 'data' as MemberData[] instead of unknown[]
  const [data] = useState<MemberData[]>(initialData);
  
  // 3. Type 'managementMembers' state correctly using MemberData[]
  const [managementMembers, setManagementMembers] = useState<{ kiny: MemberData[]; en: MemberData[] }>({
    kiny: [],
    en: [],
  });

  useEffect(() => {
    const processMembers = async () => {
      if (!data || data.length === 0) return;
      const tagIds = new Set<number>();
      
      // 'item' is now correctly inferred as MemberData here
      data.forEach((item) => item.tags?.forEach((id: number) => tagIds.add(id)));
      
      // 4. Type tagResponses as TagResponse[]
      const tagResponses: TagResponse[] = tagIds.size > 0 
        ? await fetchData(`tags?include=${[...tagIds].join(',')}`) || [] // Added default empty array just in case fetchData fails
        : [];
      
      // 5. Type tagLookup as a Record
      const tagLookup: Record<number, string> = tagResponses.reduce(
        (acc, tag) => ({ ...acc, [tag.id]: tag.name }), 
        {} as Record<number, string>
      );

      // 6. managementTemp arrays use MemberData[]
      const managementTemp: MemberData[] = [];  
      const managementKinyTemp: MemberData[] = [];


      data.forEach((item) => {
        // TypeScript now knows item.tags exists (potentially) and tagLookup is a Record
        const tags = item.tags?.map((id) => tagLookup[id]).filter(Boolean) || [];

        if (tags.includes('Management Team')) managementTemp.push(item);
        if (tags.includes('Abagize inama y\'ubucukuzi bwa Rutongo')) managementKinyTemp.push(item);
      });

      // TypeScript confirms managementTemp matches MemberData[]
      setManagementMembers({ en: managementTemp, kiny: managementKinyTemp });
    };
    processMembers();
  }, [data]);


  return (
    <>
      {/* Hero */}
      <div className="about-hero-section">
        <div className="inner-wrapper">
          <h1 className="heading text-uppercase">{d['about-us-page']?.['about-us-title']}</h1>
        </div>
      </div>

      {/* History */}
      <div ref={historyRef} className="container history-section-wrapper"  id="our-history">
        <div className="row justify-content-between">
          <div className="col-md-6 image-holder">
            <ImageGallery
              imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/06/tyu.webp"
              customClass="history-image"
              height={494}
              alt={undefined}
              width={610}
              imageName="Nyakabingo site"
            />
          </div>
          <div className="col-md-6 histort-content-holder">
            <div className="content-holder">
              <h2 className="section-heading">{d['about-us-page']?.['our-history-section-title']}</h2>
              <div className="text-content">
                <p className="fw-bold">{d['about-us-page']?.['our-history-top-description']}</p>
                <p>{d['about-us-page']?.['our-history-sub-desc']}</p>
              </div>
              <Modal size="lg" centered show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton />
                <Modal.Body>
                  <div className="text-content">
                    <p className="fw-bold">{d['about-us-page']?.['our-history-popup-top-desc']}</p>
                    <p>{d['about-us-page']?.['our-history-popup-desc']}</p>
                    <p>{d['about-us-page']?.['our-history-popup-desc1']}</p>
                    <p>{d['about-us-page']?.['our-history-popup-desc2']}</p>
                  </div>
                </Modal.Body>
              </Modal>
              <div className="general-button justify-content-left">
                <a href="#" className="hover-green" onClick={(e) => { e.preventDefault(); setModalShow(true); }}>
                  <span>{d['home']?.['read-more-button']}</span>
                  <ImageGallery
                    imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Arrow2.svg"
                    height={19}
                    alt={undefined}
                    width={13}
                    imageName="Read More Arrow"
                    customClass="Read-more-icon"
                  />
                </a>
              </div>
            </div>
          </div>
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
                <p className="text-001">{d['about-us-page']?.['our-mission-title']}</p>
              </div>
            </div>
            <div className="icon-box-description d-flex justify-content-center">
              <p className="text-description text-center">{d['about-us-page']?.['our-mission-description']}</p>
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
                <p className="text-001">{d['about-us-page']?.['our-vision-title']}</p>
              </div>
            </div>
            <div className="icon-box-description d-flex justify-content-center">
              <p className="text-description text-center">{d['about-us-page']?.['our-vision-description']}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div ref={valuesRef} className="values-section py-5" id="our-values" >
        <div className="container our-values-holder">
          <div className="inner-contentWrapper">
            <div className="trinity-heading">
              <h2 className="section-heading0002">{d['about-us-page']?.['our-values-section-title']}</h2>
            </div>
            <div className="grid-wrapper">
              <div className="the-grid-item">
                <div className="the-icon-box">
                  <div className="the-iconbox-icon">
                    <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/LightBulb.svg" alt={undefined} height={47} width={46} imageName="We Empower Icon" customClass="Our-impact-icon" />
                  </div>
                  <div className="iconbox-content-wrapper">
                    <div className="icon-box-header"><p>{d['about-us-page']?.['we-empower']}</p></div>
                    <div className="icon-box-description"><p>{d['about-us-page']?.['we-empower-description']}</p></div>
                  </div>
                </div>
              </div>
              <div className="the-grid-item">
                <div className="the-icon-box">
                  <div className="the-iconbox-icon">
                    <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Watch-icon.svg" height={47} width={46} imageName="We Do No Harm Icon" alt={undefined} customClass="Our-impact-icon" />
                  </div>
                  <div className="iconbox-content-wrapper">
                    <div className="icon-box-header"><p>{d['about-us-page']?.['we-do-no-warm']}</p></div>
                    <div className="icon-box-description"><p>{d['about-us-page']?.['we-do-no-warm-description']}</p></div>
                  </div>
                </div>
              </div>
              <div className="the-grid-item">
                <div className="the-icon-box">
                  <div className="the-iconbox-icon">
                    <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/User-icon.svg" height={47} width={46} imageName="We Set Standard Icon" alt={undefined} customClass="Our-impact-icon" />
                  </div>
                  <div className="iconbox-content-wrapper">
                    <div className="icon-box-header"><p>{d['about-us-page']?.['we-set-standard']}</p></div>
                    <div className="icon-box-description"><p>{d['about-us-page']?.['we-set-standard-description']}</p></div>
                  </div>
                </div>
              </div>
              <div className="the-grid-item">
                <div className="the-icon-box">
                  <div className="the-iconbox-icon">
                    <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/trophy-icon.svg" height={47} width={46} imageName="Accountability Icon" customClass="Our-impact-icon" alt={undefined} />
                  </div>
                  <div className="iconbox-content-wrapper">
                    <div className="icon-box-header"><p>{d['about-us-page']?.['we-hold-ourselves-accountable']}</p></div>
                    <div className="icon-box-description"><p>{d['about-us-page']?.['we-hold-ourselves-accountable-description']}</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategies */}
      <div ref={strategiesRef} className="strategies-section d-flex justify-content-center flex-column" id="our-strategies">
        <div className="inner-container container">
          <div className="top-content d-flex justify-content-center align-items-center flex-column">
            <div className="text-heading">
              <h2>{d['about-us-page']?.['our-strategy-section-title']}</h2>
            </div>
            <div className="text-content-inner">
              <p>{d['about-us-page']?.['our-strategy-section-description']}</p>
            </div>
          </div>
          <div className="grid-container">
            <div className="the-grid-item">
              <div className="the-icon-box">
                <div className="the-iconbox-icon">
                  <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Hammer-icon.svg" customClass="strategy-icon" height={70} width={71} alt={undefined} imageName="Business Strategy Icon" />
                </div>
                <div className="iconbox-content-wrapper">
                  <div className="icon-box-header"><p className="text-center">{d['about-us-page']?.['our-strategies-business']}</p></div>
                  <div className="icon-box-description"><p className="text-center">{d['about-us-page']?.['our-strategies-business-description']}</p></div>
                </div>
              </div>
            </div>
            <div className="the-grid-item">
              <div className="the-icon-box">
                <div className="the-iconbox-icon">
                  <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/group-icon.svg" customClass="strategy-icon" height={70} width={71} imageName="People Strategy Icon" alt={undefined}/>
                </div>
                <div className="iconbox-content-wrapper">
                  <div className="icon-box-header"><p className="text-center">{d['about-us-page']?.['our-strategies-people']}</p></div>
                  <div className="icon-box-description"><p className="text-center">{d['about-us-page']?.['our-strategies-people-description']}</p></div>
                </div>
              </div>
            </div>
            <div className="the-grid-item">
              <div className="the-icon-box">
                <div className="the-iconbox-icon">
                  <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/intersection-cion.svg" customClass="strategy-icon" height={70} width={71} imageName="Relationships Strategy Icon" alt={undefined} />
                </div>
                <div className="iconbox-content-wrapper">
                  <div className="icon-box-header"><p className="text-center">{d['about-us-page']?.['our-strategies-relationships']}</p></div>
                  <div className="icon-box-description"><p className="text-center">{d['about-us-page']?.['our-strategies-relationships-description']}</p></div>
                </div>
              </div>
            </div>
            <div className="the-grid-item">
              <div className="the-icon-box">
                <div className="the-iconbox-icon">
                  <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/qlementine-icons_build-16.svg" customClass="strategy-icon" height={70} width={71} imageName="Future Strategy Icon" alt={undefined} />
                </div>
                <div className="iconbox-content-wrapper">
                  <div className="icon-box-header"><p className="text-center">{d['about-us-page']?.['our-strategies-future']}</p></div>
                  <div className="icon-box-description"><p className="text-center">{d['about-us-page']?.['our-strategies-future-description']}</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Executive Management */}
      <div className="executive-management-wrapper">
        <div className="container">
          <div className="header-part">
            <h2 className="text-center">{d['our-leadership']?.['executive-management']}</h2>
          </div>
          <div className="team-members">
            {managementMembers[currentLang === 'kiny' ? 'kiny' : 'en']?.length > 0 ? (
              <div className="team-member-wrapper">
                {(currentLang === 'kiny'
                  ? managementMembers.kiny.slice(0, 3)
                  : managementMembers.en.slice(4, 8).reverse()
                )?.map((item: any) => (
                  <div key={item.id} className="single-team-member">
                    <ImageGallery
                      imageUrl={item._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/loader.gif'}
                      customClass="team-member-photo"
                      height={330}
                      width={412}
                      alt={undefined}
                      imageName={`Team Member: ${item.title?.rendered}`}
                    />
                    <div className="team-member-details">
                      <div className="team-member-info">
                        <h3 className="member-name" dangerouslySetInnerHTML={{ __html: item.title?.rendered }} />
                        <p className="member-post">{item.acf?.member_personal_information?.designation}</p>
                      </div>
                      <Modal size="lg" centered show={activeModal === item.id} onHide={() => setActiveModal(null)}>
                        <Modal.Header closeButton />
                        <Modal.Body>
                          <div className="a-member-desc">
                            <div className="a-member-image">
                              <ImageGallery
                                imageUrl={item._embedded?.['wp:featuredmedia']?.[0]?.source_url}
                                customClass="team-member-photo"
                                height={330}
                                width={259}
                                alt={undefined}
                                imageName={`Modal: ${item.title?.rendered}`}
                              />
                            </div>
                            <div className="text-content" dangerouslySetInnerHTML={{ __html: item.content?.rendered || '' }} />
                          </div>
                        </Modal.Body>
                      </Modal>
                      <div className="view-member-desc" onClick={() => setActiveModal(item.id)}>
                        <ImageGallery
                          imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Vector-1.svg"
                          height={31}
                          width={31}
                          imageName="View Member Details"
                          customClass="View-team-desc"
                          alt={undefined}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Spinner />
            )}
          </div>
          <div className="general-button justify-content-center">
            <Link href={`/${currentLang}/our-leadership`} className="hover-green">
              <span>{d['about-us-page']?.['view-all-team-button']}</span>
              <ImageGallery
                imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Arrow2.svg"
                height={19}
                width={13}
                imageName="View All Team Arrow"
                customClass="Read-more-icon"
                alt={undefined}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Products */}
      <div ref={productsRef} className="container our-products-section" id="our-products">
        <div className="first-container">
          <div className="header-part">
            <h2 className="section-heading">{d['about-us-page']?.['our-product-section-title']}</h2>
          </div>
          <div className="description-part">
            <p className="description-text">{d['about-us-page']?.['our-product-section-description']}</p>
          </div>
        </div>
        <div className="second-container d-flex">
          <div className="single-product">
            <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Tin.svg" customClass="product-image" height={218} width={412} imageName="Tin Product" alt={undefined}/>
            <div className="product-desc">
              <div className="product-name"><p>{d['about-us-page']?.['our-product-TIN']}</p></div>
              <hr className="custom-divider" />
              <div className="product-description"><p className="description-text">{d['about-us-page']?.['our-product-TIN-description']}</p></div>
            </div>
          </div>
          <div className="single-product">
            <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Tantalum.svg" customClass="product-image" height={218} width={412} imageName="Tantalum Product" alt={undefined} />
            <div className="product-desc">
              <div className="product-name"><p>{d['about-us-page']?.['our-product-TANTALUM']}</p></div>
              <hr className="custom-divider" />
              <div className="product-description"><p className="description-text">{d['about-us-page']?.['our-product-TANTALUM-description']}</p></div>
            </div>
          </div>
          <div className="single-product">
            <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Tangusten.svg" customClass="product-image" height={218} width={412} imageName="Tungsten Product" alt={undefined} />
            <div className="product-desc">
              <div className="product-name"><p>{d['about-us-page']?.['our-product-TUNGSTEN']}</p></div>
              <hr className="custom-divider" />
              <div className="product-description"><p className="description-text">{d['about-us-page']?.['our-product-TUNGSTEN-description']}</p></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientAbout;