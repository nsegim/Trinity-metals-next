// app/[lng]/our-projects/lithium-exploration/page.tsx

import { getDictionary } from '@/app/i18n/dictionaries';
import { Locale, locales } from '@/app/i18n/config';
import { Metadata } from 'next';
import '../min-styles.css';


export const metadata: Metadata = {
  title: 'Lithium Exploration | Trinity Metals Limited',
  description:
    'Trinity Metals is exploring lithium opportunities in Rwanda as part of its commitment to sustainable and responsible mining.',
  openGraph: {
    title: 'Lithium Exploration | Trinity Metals Limited',
    description:
      'Discover Trinity Metals’ lithium exploration projects in Rwanda, focused on responsible and ESG-compliant mineral development.',
    url: 'https://trinity-metals.com/our-projects/lithium-exploration',
  },
  alternates: {
    canonical: 'https://trinity-metals.com/our-projects/lithium-exploration',
  },
};

interface LithiumPageProps {
  params: Promise<{ lng: Locale }>;
}

export default async function page({ params }: LithiumPageProps) {
  const { lng } = await params;
  const dict = await getDictionary(lng);



  return (

    <>
      {/* Hero section */}
      <div className="the-project-hero-section-wrapper lithium">
        {/* Uncomment when ready */}
        {/* <video autoPlay muted loop playsInline className="hero-video">
          <source src="https://contents.trinity-metals.com/wp-content/uploads/2025/03/TRINITY-DOC-WEB_1.mp4" type="video/mp4" />
        </video> */}
      </div>

      {/* Project content */}
      <div className="project-content-wrapper pb-5">
        <div className="container d-flex justify-content-center">
          <div className="information-project">
            <div className="project-title-element">
              <h1 style={{ marginBottom: '0' }}>
                {dict["our-project-page"]?.["LITHIUM-EXPLORATION"]?.["LITHIUM-EXPLORATION-title"] ?? 'Lithium Exploration'}
              </h1>
            </div>

            <div className="project-brief">
              <p className="fw-bold">
                {dict["our-project-page"]?.["LITHIUM-EXPLORATION"]?.["LITHIUM-EXPLORATION-subtitle"] ?? ''} 
              </p>
              <p>
                {dict["our-project-page"]?.["LITHIUM-EXPLORATION"]?.["description1"] ?? ''} 
              </p>
              <p>
                {dict["our-project-page"]?.["LITHIUM-EXPLORATION"]?.["description2"] ?? ''} 
              </p>

              <div>
                <ul>
                  <li>
                    <p style={{ marginBottom: '5px' }}>
                      <b>{dict["our-project-page"]?.["LITHIUM-EXPLORATION"]?.["description2-1"] ?? ''}</b>
                    </p>
                    <p>{dict["our-project-page"]?.["LITHIUM-EXPLORATION"]?.["description2-1-0"] ?? ''}</p>
                  </li>
                  <li>
                    <p style={{ marginBottom: '5px' }}>
                      <b>{dict["our-project-page"]?.["LITHIUM-EXPLORATION"]?.["description2-2"] ?? ''}</b>
                    </p>
                    <p>{dict["our-project-page"]?.["LITHIUM-EXPLORATION"]?.["description2-2-0"] ?? ''}</p>
                  </li>
                  <li>
                    <p style={{ marginBottom: '5px' }}>
                      <b>{dict["our-project-page"]?.["LITHIUM-EXPLORATION"]?.["description2-3"] ?? ''}</b>
                    </p>
                    <p>{dict["our-project-page"]?.["LITHIUM-EXPLORATION"]?.["description2-3-0"] ?? ''}</p>
                  </li>
                  <li>
                    <p style={{ marginBottom: '5px' }}>
                      <b>{dict["our-project-page"]?.["LITHIUM-EXPLORATION"]?.["description2-4"] ?? ''}</b>
                    </p>
                    <p>{dict["our-project-page"]?.["LITHIUM-EXPLORATION"]?.["description2-4-0"] ?? ''}</p>
                  </li>
                </ul>
              </div>

              <p>
                {dict["our-project-page"]?.["LITHIUM-EXPLORATION"]?.["description3"] ?? ''} 
              </p>
              <p>
                {dict["our-project-page"]?.["LITHIUM-EXPLORATION"]?.["description4"] ?? ''} 
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="yellow-bg"></div>

     </>
  );
}

