// app/[lng]/investor-relations/reports/ClientReports.tsx
'use client';

import { useEffect, useState } from 'react';
import ImageGallery from '@/components/common/ImageGallery';
import { fetchData } from '../../../../../lib/config/apiConfig';
import { useTranslation } from '@/app/context/TranslationContext';
import Spinner from '@/components/ui/Spinner/Spinner';
import './styles.css'

const ClientReports = ({ lng }: { lng: string }) => {
  const { dict, lang } = useTranslation();
  const currentLang = lang || lng;

  const [Documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetchData('trinity-document?categories=81');
        setDocuments(response || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reports:', err);
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  useEffect(() => {
    if (!selectedPostId) return;

    const downloadPdf = async () => {
      setLoadingPdf(true);
      try {
        const media = await fetchData(`media?parent=${selectedPostId}`);
        if (media?.[0]?.guid?.rendered) {
          window.open(media[0].guid.rendered, '_blank');
        }
      } catch (err) {
        console.error('Download failed:', err);
      } finally {
        setLoadingPdf(false);
        setSelectedPostId('');
      }
    };
    downloadPdf();
  }, [selectedPostId]);

  const filteredReports = Documents.filter((item: any) =>
    item.title.rendered.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Hero */}
      <div className="custom-hero reports">
        <div className="child-item-wrapper z-1">
          <h1 className="heading text-uppercase">
            {dict['reports']?.['report-page-title']}
          </h1>
        </div>
      </div>

      {/* Search + Reports */}
      <div className="contains-reports">
        <div className="container">
          {/* Search Form */}
          <div className="top-search-container">
            <div className="search-form">
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder={dict['reports']?.['form-placeholder']}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">
                  <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Symbol-9.svg" 
                    height={16}
                    width={16}
                    customClass="search-icon"
                    imageName="search Icon"
                    alt={undefined}
                  />
                </button>
              </form>
            </div>
          </div>

          <div className="no-report-found">
                         <h1 >Reports ...</h1>
          </div> 

          {/* Reports List */}
          {/* <div className="reports-container">
            {loading ? (
              <div className="d-flex justify-content-center py-5">
                <Spinner />
              </div>
            ) : filteredReports.length === 0 ? (
              <div className="no-report-found text-center py-5">
                <h3>{searchTerm ? dict['reports']?.['no-results'] || 'No reports found' : dict['reports']?.['no-reports'] || 'No reports available'}</h3>
              </div>
            ) : (
              filteredReports.map((item: any, index: number) => (
                <div key={index} className="single-report">
                  <div className="report-name">
                    <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Report-icon.svg"
                     
                    />
                    <h4
                      className="report-name"
                      dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                    />
                  </div>
                  <div className="download-section">
                    <a
                      className="download-button"
                      onClick={() => setSelectedPostId(item.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <span>
                        {loadingPdf ? 'Opening...' : dict['reports']?.['Download-btn'] || 'Download'}
                      </span>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div> */}

        </div>
      </div>
    </>
  );
};

export default ClientReports;