// app/[lng]/about/ClientAbout.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Spinner from '@/components/ui/Spinner/Spinner';
import ImageGallery from '@/components/common/ImageGallery';
import Link from 'next/link';
import { fetchData } from '../../../../lib/config/apiConfig';
import { useTranslation } from '@/app/context/TranslationContext';


interface ClientAboutProps {
  initialData: any[];
  initialError: any;
  lng: string;
}

const ClientAbout = ({ initialData, initialError, lng }: ClientAboutProps) => {
  const pathname = usePathname();
  const { dict, lang } = useTranslation();
  const currentLang = lang || lng;
  const finalDict = dict || {};

   const historyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const strategiesRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);


  // 1. **FIXED LINE:** Changed HTMLElement to HTMLDivElement
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // We need to check window.location.hash, which is the client-side hash value
    const hash = window.location.hash; 

    // The hash includes the '#', so we check against '#our-products', etc.
    if (hash === '#our-history') scrollToSection(historyRef);
    else if (hash === '#our-values') scrollToSection(valuesRef);
    else if (hash === '#our-strategies') scrollToSection(strategiesRef);
    else if (hash === '#our-products') scrollToSection(productsRef);
    
    // You might also want a fallback if the user is already on the page without a hash
    // and then clicks an internal link (pathname change won't trigger if only hash changes)

    // A better approach is to also listen for the hash change event
    const handleHashChange = () => {
        const newHash = window.location.hash;
        if (newHash === '#our-history') scrollToSection(historyRef);
        else if (newHash === '#our-values') scrollToSection(valuesRef);
        else if (newHash === '#our-strategies') scrollToSection(strategiesRef);
        else if (newHash === '#our-products') scrollToSection(productsRef);
    };

    // Listen for hash changes if the user navigates within the same page
    window.addEventListener('hashchange', handleHashChange);

    // Cleanup the event listener when the component unmounts
    return () => {
        window.removeEventListener('hashchange', handleHashChange);
    };

  }, [pathname]);

  const [modalShow, setModalShow] = useState(false);
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [data, setData] = useState(initialData);
  const [error] = useState(initialError);

  const [boardMember, setBoardMember] = useState<any[]>([]);
  const [managementMember, setManagementMember] = useState<any[]>([]);
  const [rutongoBoardMember, setRutongoBoardMember] = useState<any[]>([]);
  const [managementMembers, setManagementMembers] = useState<{ kiny: any[]; en: any[] }>({
    kiny: [],
    en: [],
  });

  useEffect(() => {
    const processMembers = async () => {
      if (!data || data.length === 0) return;

      const tagIds = new Set<number>();
      data.forEach((item: any) => item?.tags?.forEach((id: number) => tagIds.add(id)));

      const tagResponses = tagIds.size > 0 ? await fetchData(`tags?include=${[...tagIds].join(',')}`) : [];
      const tagLookup = tagResponses.reduce((acc: any, tag: any) => ({ ...acc, [tag.id]: tag.name }), {});

      const boardTemp: any[] = [];
      const managementTemp: any[] = [];
      const rutongoTemp: any[] = [];
      const managementKinyTemp: any[] = [];

      data.forEach((item: any) => {
        const tags = item?.tags?.map((id: number) => tagLookup[id]) || [];
        if (tags.includes('Board member')) boardTemp.push(item);
        if (tags.includes('Management Team')) managementTemp.push(item);
        if (tags.includes('Rutongo Mines Board Members')) rutongoTemp.push(item);
        if (tags.includes('Abagize inama y\'ubucukuzi bwa Rutongo')) managementKinyTemp.push(item);
      });

      setBoardMember(boardTemp);
      setManagementMember(managementTemp);
      setRutongoBoardMember(rutongoTemp);
      setManagementMembers({ en: managementTemp, kiny: managementKinyTemp });
    };

    processMembers();
  }, [data]);

  return (
    <>
      {/* Hero */}
      <div className="about-hero-section">
        <div className="inner-wrapper">
          <h1 className="heading text-uppercase">{finalDict["about-us-page"]?.["about-us-title"]}</h1>
        </div>
      </div>

      {/* History */}
      <div ref={historyRef} className="container history-section-wrapper">
        <div className="row justify-content-between">
          <div className="col-md-6 image-holder">
            <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/06/tyu.webp" customClass="history-image" height={494}
        width={610} imageName={"Nyakabingo site"}  />
          </div>
          <div className="col-md-6 histort-content-holder">
            <div className="content-holder">
              <h1 className="section-heading">{finalDict["about-us-page"]?.["our-history-section-title"]}</h1>
              <div className="text-content">
                <p className="fw-bold">{finalDict["about-us-page"]?.["our-history-top-description"]}</p>
                <p>{finalDict["about-us-page"]?.["our-history-sub-desc"]}</p>
              </div>
              <Modal size="lg" centered show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton />
                <Modal.Body>
                  <div className="text-content">
                    <p className="fw-bold">{finalDict["about-us-page"]?.["our-history-popup-top-desc"]}</p>
                    <p>{finalDict["about-us-page"]?.["our-history-popup-desc"]}</p>
                    <p>{finalDict["about-us-page"]?.["our-history-popup-desc1"]}</p>
                    <p>{finalDict["about-us-page"]?.["our-history-popup-desc2"]}</p>
                  </div>
                </Modal.Body>
              </Modal>
              <div className="general-button justify-content-left">
                <a href="#" className="hover-green" onClick={() => setModalShow(true)}>
                  <span>{finalDict.home?.["read-more-button"]}</span>
                  <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Arrow2.svg" height={19}
        width={13}  imageName={"Read More"} customClass={"Read-more-icon"} />
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
                <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Our_mission-icon.svg" height={73}
        width={73}  imageName={"Our mission icon"} customClass={"Our-mission-photo"}  />
              </div>
              <div className="icon-box-header">
                <p className="text-001">{finalDict["about-us-page"]?.["our-mission-title"]}</p>
              </div>
            </div>
            <div className="icon-box-description d-flex justify-content-center">
              <p className="text-description text-center">{finalDict["about-us-page"]?.["our-mission-description"]}</p>
            </div>
          </div>
          <div className="col-md-6 our-vision d-flex justify-content-center align-items-center flex-column">
            <div className="icon-box">
              <div className="icon d-flex justify-content-center">
                <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Our_vision-icon.svg" height={73}
        width={73}  imageName={"Our vision icon"} customClass={"Our-vision-icon"} />
              </div>
              <div className="icon-box-text">
                <p className="text-001">{finalDict["about-us-page"]?.["our-vision-title"]}</p>
              </div>
            </div>
            <div className="icon-box-description d-flex justify-content-center">
              <p className="text-description text-center">{finalDict["about-us-page"]?.["our-vision-description"]}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div ref={valuesRef} className="values-section py-5">
        <div className="container our-values-holder">
          <div className="inner-contentWrapper">
            <div className="trinity-heading">
              <h2 className="section-heading0002">{finalDict["about-us-page"]?.["our-values-section-title"]}</h2>
            </div>
            <div className="grid-wrapper">
              {/* Repeat for each value */}
              <div className="the-grid-item">
                <div className="the-icon-box">
                  <div className="the-iconbox-icon">
                    <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/LightBulb.svg" height={47}
        width={46}  imageName={"Impact More"} customClass={"Our-impact-icon"}  />
                  </div>
                  <div className="iconbox-content-wrapper">
                    <div className="icon-box-header">
                      <p>{finalDict["about-us-page"]?.["we-empower"]}</p>
                    </div>
                    <div className="icon-box-description">
                      <p>{finalDict["about-us-page"]?.["we-empower-description"]}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="the-grid-item">
                <div className="the-icon-box">
                    <div className="the-iconbox-icon">
                        <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Watch-icon.svg" height={47}
        width={46}  imageName={"Impact More"} customClass={"Our-impact-icon"} />
                    </div>
                    <div className="iconbox-content-wrapper">
                        <div className="icon-box-header">
                            <p>{finalDict["about-us-page"]["we-do-no-warm"]}</p>   
                        </div>
                        <div className="icon-box-description">
                            <p>{finalDict["about-us-page"]["we-do-no-warm-description"]}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="the-grid-item">
                <div className="the-icon-box">
                    <div className="the-iconbox-icon">
                        <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/User-icon.svg" height={47}
        width={46}  imageName={"Impact More"} customClass={"Our-impact-icon"} />
                    </div>
                    <div className="iconbox-content-wrapper">
                        <div className="icon-box-header">
                            <p>{finalDict["about-us-page"]["we-set-standard"]}</p>   
                        </div>
                        <div className="icon-box-description">
                            <p>{finalDict["about-us-page"]["we-set-standard-description"]}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="the-grid-item">
                <div className="the-icon-box">
                    <div className="the-iconbox-icon">
                        <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/trophy-icon.svg" height={47}
        width={46}  imageName={"Impact More"} customClass={"Our-impact-icon"} />
                    </div>
                    <div className="iconbox-content-wrapper">
                        <div className="icon-box-header">
                            <p>{finalDict["about-us-page"]["we-hold-ourselves-accountable"]}</p>   
                        </div>
                        <div className="icon-box-description">
                            <p>{finalDict["about-us-page"]["we-hold-ourselves-accountable-description"]}</p>
                        </div>
                    </div>
                </div>
            </div>

              
            </div>
          </div>
        </div>
      </div>

      {/* Strategies */}
      <div ref={strategiesRef} className="strategies-section d-flex justify-content-center flex-column">
        {/* Same pattern as values */}
          <div className="inner-container container">
            <div className="top-content d-flex justify-content-center align-items-center flex-column">
                <div className="text-heading">
                    <h2>
                        
                        {finalDict["about-us-page"]?.["our-strategy-section-title"]}
                    </h2>
                </div>
                <div className="text-content-inner">
                    <p>
                        {finalDict["about-us-page"]["our-strategy-section-description"]}
                    </p>
                </div>

            </div>
            <div className="grid-container">
                <div className="the-grid-item">
                    <div className="the-icon-box">
                        <div className="the-iconbox-icon">
                        <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Hammer-icon.svg" customClass={'strategy-icon'} height={70}
        width={71}  imageName={"Strategies Icon"} />
                        </div>
                        <div className="iconbox-content-wrapper">
                            <div className="icon-box-header">
                                <p className="text-center"> {finalDict["about-us-page"]["our-strategies-business"]}</p>   
                            </div>
                            <div className="icon-box-description">
                                <p className="text-center">
                                {finalDict["about-us-page"]["our-strategies-business-description"]}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="the-grid-item">
                    <div className="the-icon-box">
                        <div className="the-iconbox-icon">
                        <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/group-icon.svg" customClass={'strategy-icon'} height={70}
        width={71}  imageName={"Strategies Icon"}/>
                        </div>
                        <div className="iconbox-content-wrapper">
                            <div className="icon-box-header">
                                <p className="text-center">{finalDict["about-us-page"]["our-strategies-people"]}</p>   
                            </div>
                            <div className="icon-box-description">
                                <p className="text-center">{finalDict["about-us-page"]["our-strategies-people-description"]}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="the-grid-item">
                    <div className="the-icon-box">
                        <div className="the-iconbox-icon">
                        <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/intersection-cion.svg" customClass={'strategy-icon'} height={70}
        width={71}  imageName={"Strategies Icon"}/>
                        </div>
                        <div className="iconbox-content-wrapper">
                            <div className="icon-box-header">
                                <p className="text-center">{finalDict["about-us-page"]["our-strategies-relationships"]}</p>   
                            </div>
                            <div className="icon-box-description">
                                <p className="text-center">{finalDict["about-us-page"]["our-strategies-relationships-description"]}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="the-grid-item">
                    <div className="the-icon-box">
                        <div className="the-iconbox-icon">
                        <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/qlementine-icons_build-16.svg" customClass={'strategy-icon'} height={70}
        width={71}  imageName={"Strategies Icon"}/>
                        </div>
                        <div className="iconbox-content-wrapper">
                            <div className="icon-box-header">
                                <p className="text-center">{finalDict["about-us-page"]["our-strategies-future"]}</p>   
                            </div>
                            <div className="icon-box-description">
                                <p className="text-center">
                                {finalDict["about-us-page"]["our-strategies-future-description"]}</p>
                            </div>
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
            <h2 className="text-center">{finalDict["our-leadership"]?.["executive-management"]}</h2>
          </div>
          <div className="team-members">
            {managementMembers[currentLang === 'kiny' ? 'kiny' : 'en']?.length > 0 ? (
              <div className="team-member-wrapper">
                {(currentLang === 'kiny'
                  ? managementMembers.kiny.slice(0, 3)
                  : managementMembers.en.slice(5, 8).reverse()
                )?.map((item: any) => (
                  <div key={item.id} className="single-team-member">
                    <ImageGallery
                      imageUrl={item._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/loader.gif'}
                      customClass="team-member-photo"
                      height={330}
                        width={412} 
                        imageName={"Team membber Photo"}
                    />
                    <div className="team-member-details">
                      <div className="team-member-info">
                        <h3 className="member-name">{item.title?.rendered}</h3>
                        <p className="member-post">{item.acf?.member_personal_information?.designation}</p>
                      </div>
                      <Modal size="lg" centered show={activeModal === item.id} onHide={() => setActiveModal(null)}>
                        <Modal.Header closeButton />
                        <Modal.Body>
                          <div className="a-member-desc">
                            <div className="a-member-image">
                              <ImageGallery imageUrl={item._embedded?.['wp:featuredmedia']?.[0]?.source_url} customClass="team-member-photo" height={330}  width={259}  imageName={"Team member Photo"} />
                            </div>
                            <div className="text-content" dangerouslySetInnerHTML={{ __html: item.content?.rendered || '' }} />
                          </div>
                        </Modal.Body>
                      </Modal>
                      <div className="view-member-desc" onClick={() => setActiveModal(item.id)}>
                        <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Vector-1.svg" 
                          height={31}
                          width={31}
                          customClass="View-team-desc"
                            imageName={"Team member Description"}
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
            <Link href={`/${currentLang}/about/our-leadership`} className="hover-green">
              <span>{finalDict["about-us-page"]?.["view-all-team-button"]}</span>
              <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Arrow2.svg" height={19}
        width={13}  imageName={"Read More icon"} customClass={"Read-more-icon"} />
            </Link>
          </div>
        </div>
      </div>

      {/* Products */}
      <div ref={productsRef} className="container our-products-section">
        <div className="first-container">
          <div className="header-part">
            <h2 className="section-heading">{finalDict["about-us-page"]?.["our-product-section-title"]}</h2>
          </div>
          <div className="description-part">
            <p className="description-text">{finalDict["about-us-page"]?.["our-product-section-description"]}</p>
          </div>
        </div>
        <div className="second-container d-flex">
          <div className="single-product">
            <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Tin.svg" customClass="product-image"
              height={218}
              width={412} 
              imageName={"Prodcut Image"}
             />
            <div className="product-desc">
              <div className="product-name">
                <p>{finalDict["about-us-page"]?.["our-product-TIN"]}</p>
              </div>
              <hr className="custom-divider" />
              <div className="product-description">
                <p className="description-text">{finalDict["about-us-page"]?.["our-product-TIN-description"]}</p>
              </div>
            </div>
          </div>

          <div className="single-product">
            <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Tantalum.svg" customClass={'product-image'}
              height={218}
              width={412} 
              imageName={"Prodcut Image"}
             />
            <div className="product-desc">
                <div className="product-name">
                    <p>
                        {("about-us-page.our-product-TANTALUM")}
                    </p>
                </div>
                <hr className="custom-divider" />

                
                <div className="product-description">
                    <p className="description-text">
                        {finalDict["about-us-page"]["our-product-TANTALUM-description"]}
                    </p>
                </div>
            </div>
        </div>
        <div className="single-product">
            <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Tangusten.svg" customClass={'product-image'} 
              height={218}
              width={412} 
              imageName={"Prodcut Image"}
            />
            <div className="product-desc">
                <div className="product-name">
                    <p>
                        {finalDict["about-us-page"]["our-product-TUNGSTEN"]}
                    </p>
                </div>
                <hr className="custom-divider" />
                <div className="product-description">
                    <p className="description-text">
                        {finalDict["about-us-page"]["our-product-TUNGSTEN-description"]}

                    </p>
                </div>
            </div>
        </div>

        </div>
      </div>
    </>
  );
};

export default ClientAbout;