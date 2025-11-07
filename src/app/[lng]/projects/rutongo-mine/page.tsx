// app/[lng]/our-projects/rutongo/page.tsx

import ImageGallery from '@/components/common/ImageGallery';
import { getDictionary } from '@/app/i18n/dictionaries';
import { Locale, locales } from '@/app/i18n/config';
import { Metadata } from 'next';
import '../min-styles.css'; // ← your existing Rutongo CSS

export const metadata: Metadata = {
  title: 'Rutongo Mines | Trinity Metals Limited',
  description:
    'Explore Rutongo Mines – Trinity Metals’ flagship tin mining operation in Rwanda with multiple satellite sites and a strong commitment to responsible mining.',
  openGraph: {
    title: 'Rutongo Mines | Trinity Metals Limited',
    description:
      'Discover Rutongo Mines, the largest tin producer in Trinity Metals’ portfolio, operating responsibly with full ESG and conflict-free certification.',
    url: 'https://trinity-metals.com/our-projects/rutongo',
  },
  alternates: {
    canonical: 'https://trinity-metals.com/our-projects/rutongo',
  },
};

interface RutongoPageProps {
  params: Promise<{ lng: Locale }>;
}

export default async function RutongoPage({ params }: RutongoPageProps) {
  const { lng } = await params;
  const dict = await getDictionary(lng);

  const r = dict["our-project-page"]?.["rutongo-mines"] ?? {};

  return (
    <>

      {/* Hero section with video */}
      <div className="the-project-hero-section-wrapper">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="https://contents.trinity-metals.com/wp-content/uploads/2025/06/rutongo-122.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Project description */}
      <div className="project-content-wrapper">
        <div className="container d-flex justify-content-center">
          <div className="information-project">
            <div className="project-title-element">
              <h1>{r["rutongo-title"] ?? 'Rutongo Mines'}</h1>
            </div>

            {/* Stats row - 4 columns */}
            <div className="work-result row">
              <div className="col-md-3 stats">
                <div className="icon-element">
                  <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Black-3.svg"
                     height={52}
                   width={51}
                   imageName="productions data"
                   customClass="productions"
                  />
                </div>
                <div className="details-element">
                  <h4>{r["satellite-mines"] ?? ''}</h4>
                  <p>{r["satellite-mines-achievement"] ?? ''}</p>
                </div>
              </div>

              <div className="col-md-3 stats">
                <div className="icon-element">
                  <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Black.svg"
                     height={52}
                   width={51}
                   imageName="productions data"
                   customClass="productions"
                  />
                </div>
                <div className="details-element">
                  <h4>{r["tin-production"] ?? ''}</h4>
                  <p>{r["tin-production-achievement"] ?? ''}</p>
                </div>
              </div>

              <div className="col-md-3 stats">
                <div className="icon-element">
                  <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Black-1.svg"
                     height={52}
                   width={51}
                   imageName="productions data"
                   customClass="productions"
                  />
                </div>
                <div className="details-element">
                  <h4>{r["workforce"] ?? ''}</h4>
                  <p>{r["Workforce-achievement"] ?? ''}</p>
                </div>
              </div>

              <div className="col-md-3 stats">
                <div className="icon-element">
                  <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Black-2.svg"
                     height={52}
                   width={51}
                   imageName="productions data"
                   customClass="productions"
                  />
                </div>
                <div className="details-element">
                  <h4>{r["location"] ?? ''}</h4>
                  <p>
                    {r["location-achievement"] ?? ''}<br />
                    {r["location-achievement1"] ?? ''}
                  </p>
                </div>
              </div>
            </div>

            {/* Project brief */}
            <div className="project-brief pt-3">
              <p className="fw-bold heading-20">
                {r["rutongo-bold-title"] ?? ''}
              </p>
              <p>{r["rutongo-description"] ?? ''}</p>
              <p>{r["rutongo-description1"] ?? ''}</p>
              <p>{r["rutongo-description2"] ?? ''}</p>
              <p>{r["rutongo-description3"] ?? ''}</p>
              <p>{r["rutongo-description4"] ?? ''}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Project site map */}
      <div className="main-map-parent">
        <div className="map-wrapper rutongo-map">
          {/* Optional: Add map image */}
          {/* <ImageGallery imageUrl="/rutongo-map.jpg" customClass="w-100" /> */}
        </div>
      </div>

    </>
  );
}

