// app/[lng]/sustainability/ClientSustainability.tsx
'use client';

import { useEffect, useState } from 'react';
import ImageGallery from '@/components/common/ImageGallery';
import { fetchData } from '../../../../lib/config/apiConfig';
import { useTranslation } from '@/app/context/TranslationContext';
import './styles.css'; // ← your CSS

const ClientSustainability = ({ lng }: { lng: string }) => {
  const { dict, lang } = useTranslation();

  const [Documents, setDocuments] = useState<any[]>([]);
  const [Documents2, setDocuments2] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [selectedPostUrl, setSelectedPostUrl] = useState<string>('');

  const [data, setData] = useState<{[key: string]: any}>({})

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [resp1, resp2] = await Promise.all([
          fetchData('trinity-document?categories=79'),
          fetchData('trinity-document?categories=81'),
        ]);
        setDocuments(resp1 || []);
        setDocuments2(resp2 || []);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setLoading(false);
      }
    };
    fetchReports();

  }, []);

  useEffect(() => {
    if (!selectedPostUrl) return;

    const downloadPdf = async (mediaUrl: any) => {
      // setLoadingPdf(true);
      if (mediaUrl) {
           window.open(mediaUrl, '_blank');
      }
      // try {
      //   const media = await fetchData(`media/${selectedPostUrl}`);
      //   if (media?.source_url) {
      //     window.open(media.source_url, '_blank');
      //   }
      // } catch (err) {
      //   console.error('Download failed:', err);
      // } finally {
      //   setLoadingPdf(false);
      //   setSelectedPostUrl('');
      // }
    };

    downloadPdf(selectedPostUrl);

    // console.log('Selected Post URL:', selectedPostUrl);
  }, [selectedPostUrl]);





  return (
    <>
      {/* Hero */}
      <div className="about-hero-section">
        <div className="inner-wrapper">
          <h1 className="heading text-uppercase">
            {dict['Sustainability']?.['sustainability-page-title']}
          </h1>
        </div>
      </div>

      {/* Upper Content */}
      <div className="below-hero-wrappr">
        <div className="container sust-container">
          <div className="row pt-5 pb-5">
            <div className="sust-upper-content col-md-6">
              <h2>{dict['Sustainability']?.['sustainability-into-left-header']}</h2>
              <p>{dict['Sustainability']?.['sustainability-into-left-header-desc']}</p>
            </div>
            <div className="sust-upper-content col-md-6">
              <h2>{dict['Sustainability']?.['sustainability-into-right-header']}</h2>
              <p className="responsive-margin">
                {dict['Sustainability']?.['sustainability-into-right-header-desc']}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Water Management */}
      <div className="community-section">
        <div className="row">
          <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Community-icon.svg" customClass="sustainabilty-icon sus-icon"
            height={1080}
                   width={1920}
                   imageName="sustainability feature"
                   alt={undefined}
           />
          <div className="col-md-6 community-content">
            <div className="content-wrapper">
              <h2 className="section-header header009">
                {dict['Sustainability']?.['water-management-title']}
              </h2>
              <p>{dict['Sustainability']?.['water-management-desc']}</p>
            </div>
          </div>
          <div className="col-md-6 water-man"></div>
        </div>
      </div>

      {/* Tailings */}
      <div className="our-approach-section">
        <div className="row">
          <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Environment-bulk.svg" customClass="sustainabilty-icon sus-icon"
            height={1014}
                   width={574}
                   imageName="sustainability feature"
                   alt={undefined}
          />
          <div className="col-md-6 bg-section"></div>
          <div className="col-md-6 content-section has-content">
            <div className="content-wrapper">
              <h2 className="section-header header008">
                {dict['Sustainability']?.['approach-to-Tailings-title']}
              </h2>
              <p>{dict['Sustainability']?.['approach-to-Tailings-desc']}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Closure */}
      <div className="community-section">
        <div className="row">
          <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Community-icon.svg" customClass="sustainabilty-icon sus-icon"
           height={913}
                   width={607}
                   imageName="sustainability feature"
                   alt={undefined}
          />
          <div className="col-md-6 community-content">
            <div className="content-wrapper">
              <h2 className="section-header header009">
                {dict['Sustainability']?.['approach-to-closure-management-title']}
              </h2>
              <p>{dict['Sustainability']?.['approach-to-closure-management-desc1']}</p>
            </div>
          </div>
          <div className="col-md-6 community-bg-section"></div>
        </div>
      </div>

      {/* Community */}
      <div className="goverance1">
        <div className="row">
          <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Container-4.svg" customClass="sustainabilty-icon sus-icon" 
           height={1024}
                   width={672}
                   imageName="sustainability feature"
                   alt={undefined}
          />
          <div className="col-md-6 bg-section"></div>
          <div className="col-md-6 content-section has-content1">
            <div className="content-wrapper">
              <h2 className="section-header header009">
                {dict['Sustainability']?.['community-title']}
              </h2>
              <p>{dict['Sustainability']?.['community-description1']}</p>
              <p>{dict['Sustainability']?.['community-description2']}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Occupational Health */}
      <div className="community-section1">
        <div className="row">
          <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Community-icon.svg" customClass="sustainabilty-icon sus-icon" 
           height={730}
                   width={592}
                   alt={undefined}
                   imageName="sustainability feature"
          />
          <div className="col-md-6 community-content">
            <div className="content-wrapper">
              <h2 className="section-header header009">
                {dict['Sustainability']?.['Occupational-Health-title']}
              </h2>
              <p>{dict['Sustainability']?.['Occupational-Health-desc']}</p>
              <div className="w-100 pt-4">
                <p>{dict['Sustainability']?.['Occupational-statement-title']}</p>
                <p>{dict['Sustainability']?.['Occupational-statement-desc']}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 community-bg-section1"></div>
        </div>
      </div>

      <div className="yellow-bg"></div>

      {/* Governance */}
      <div className="the-project-hero-section-wrapper Governance-section"></div>
      <div className="project-content-wrapper pb-5">
        <div className="container d-flex justify-content-center">
          <div className="information-project">
            <div className="project-title-element">
              <h2>{dict['Sustainability']?.['governance']}</h2>
              <div className="project-brief2 pt-3">
                <h4>{dict['Sustainability']?.['governance-subtitle1']}</h4>
                <p>{dict['Sustainability']?.['governance-desc1']}</p>
                <h4>{dict['Sustainability']?.['governance-subtitle2']}</h4>
                <p>{dict['Sustainability']?.['governance-desc2']}</p>
                <h4>{dict['Sustainability']?.['governance-subtitle3']}</h4>
                <p>{dict['Sustainability']?.['governance-desc3']}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diligence Reports */}
      <div className="policies-section-wrapper1">
        <div className="container">
          <div className="policies-section-title">
            <h2>{dict['Sustainability']?.['Diligence-report']}</h2>
          </div>
          <div className="reports-container">
            {loading ? (
              <div>Loading...</div>
            ) : Documents2.length === 0 ? (
              <div>No reports available</div>
            ) : (
              Documents2.map((item: any, i: number) => (
                <div key={i} className="single-report">
                  <div className="report-name">
                    <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Report-icon.svg"
                     height={51}
                   width={51}
                   customClass="pdf"
                   imageName="Pdf icon"
                   alt={undefined}
                    />
                    <h4 dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
                  </div>
                  <div className="download-section">
                    <a
                      className="download-button"
                      onClick={() => setSelectedPostUrl(item.acf.document_uploaded.url)}
                      style={{ cursor: 'pointer',  caretColor: 'transparent' }}
                    >
                      <span>{loadingPdf ? 'Opening...' : dict['reports']?.['Download-btn']}</span>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Policies & Standards */}
      <div className="policies-section-wrapper">
        <div className="container">
          <div className="policies-section-title">
            <h2>{dict['Sustainability']?.['policies-standards']}</h2>
          </div>
          <div className="reports-container">
            {loading ? (
              <div>Loading...</div>
            ) : Documents.length === 0 ? (
              <div>No policies available</div>
            ) : (
              Documents.map((item: any, i: number) => (
                <div key={i} className="single-report">
                  <div className="report-name">
                    <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Report-icon.svg"
                       height={51}
                   width={51}
                   customClass="pdf"
                   imageName="Pdf icon"
                   alt={undefined}
                    />
                    <h4 dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
                  </div>
                  <div className="download-section">
                    <a
                      className="download-button"
                      onClick={() => setSelectedPostUrl(item.acf.document_uploaded.url)}
                      style={{ cursor: 'pointer' }}
                    > 
                      
                      <span>{loadingPdf ? 'Opening...' : dict['reports']?.['Download-btn']}</span>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientSustainability;