// app/careers/CareersClient.tsx
'use client';

import { useEffect, useState } from 'react';
import ImageGallery from '@/components/common/ImageGallery';
// import ResumeUpload from './DrapDropTest';
import { fetchData } from '../../../../lib/config/apiConfig';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import "./styles.css";

export default function CareersClient() {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [data, setData] = useState<any[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption("");
    setSelectedLocation(event.target.value);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetchData('job');
        if (response?.length > 0) {
          setData(response);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <>
      {/* Top Section */}
      <div className="get-in-career-Section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 left">
              <div className="get-in-career"></div>
            </div>
            <div className="col-md-6 right">
              <div className="right-header">
                <h1>{t("careers.top-title")}</h1>
              </div>
              <div className="right-description">
                <p>{t("careers.top-desc1")}</p>
                <p>{t("careers.top-desc2")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job List Section */}
      <div className="jobs-section-wrapper">
        <div className="container">
          <div className="find-job-wrapper">
            <div className="job-search-section">
              <div className="top-job-search">
                <div className="job-filter">
                  <form className="job-filter">
                    <div className="search-fields d-flex">
                      <div className="job-name-field">
                        <label>{t("careers.search-form.input-title")}</label>
                        <input
                          type="text"
                          name="job-name"
                          placeholder={t("careers.search-form.input-placeholder")}
                        />
                      </div>
                      <div className="select-location-field">
                        <div className="select-field">
                          <select value={selectedOption} onChange={handleChange}>
                            <option value="" disabled>
                              {t("careers.search-form.select-field-title")}
                            </option>
                            <option value="Nyakabingo">Nyakabingo</option>
                            <option value="Musha">Musha</option>
                            <option value="Rutongo">Rutongo</option>
                          </select>
                        </div>
                        <input
                          type="text"
                          value={selectedLocation || "Nyakabingo"}
                          readOnly
                          className="near-location"
                        />
                      </div>
                    </div>
                    <button type="submit">
                      <ImageGallery
                        imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/03/Container.svg"
                        imageName="search icon"
                        customClass="seach--icon"
                        width={17}
                        height={17}
                      />
                    </button>
                  </form>
                </div>
                {/* <div className="upload-resume"><ResumeUpload /></div> */}
              </div>

              <div className="job-cards-wrapper">
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <div key={index} className="card">
                      <div className="upper-card">
                        <div className="job-name">
                          <span>{item?.acf?.job_type}</span>
                          <h4 className="job-title" dangerouslySetInnerHTML={{ __html: item?.title?.rendered }} />
                        </div>
                        <Link href={`/apply/${item?.id}`} className="apply-button">
                          <span>Apply Now</span>
                          <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/03/Container-1.svg"
                             imageName="Arrow icon"
                                customClass="Arrow--icon"
                                width={14}
                                height={16}
                           />
                        </Link>
                      </div>
                      <div className="bellow-card">
                        <ul className="job-details">
                          <li>
                            <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/03/Symbol.svg"
                               imageName="Location icon"
                                customClass="map--icon"
                                width={13}
                                height={17}
                             />
                            <span>{item?.acf?.location}</span>
                          </li>
                          <li>
                            <span className="job-date">Posting Date</span>
                            <span>{moment(item?.date).format("DD/MM/YYYY")}</span>
                          </li>
                          <li>
                            <span className="job-date">Closing date</span>
                            <span>{moment(item?.acf?.closing_date).format("DD/MM/YYYY")}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-position">
                    <p className="text-center">{t("careers.No-position")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}