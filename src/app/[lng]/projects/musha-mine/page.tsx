// app/[lng]/our-projects/musha/page.tsx

import ImageGallery from '@/components/common/ImageGallery';
import { getDictionary } from '@/app/i18n/dictionaries';
import { Locale, locales } from '@/app/i18n/config';
import { Metadata } from 'next';
import '../min-styles.css'; // ← your existing Musha CSS

export const metadata: Metadata = {
  title: 'Musha Mines | Trinity Metals Limited',
  description:
    'Discover Musha Mines – one of Trinity Metals’ key tin mining operations in Rwanda, delivering responsible and sustainable mineral production.',
  openGraph: {
    title: 'Musha Mines | Trinity Metals Limited',
    description:
      'Explore Musha Mines, a cornerstone of Trinity Metals’ conflict-free tin production in Rwanda with strong ESG standards.',
    url: 'https://trinity-metals.com/our-projects/musha',
  },
  alternates: {
    canonical: 'https://trinity-metals.com/our-projects/musha',
  },
};

interface MushaPageProps {
  params: Promise<{ lng: Locale }>;
}

export default async function page({ params }: MushaPageProps) {
  const { lng } = await params;
  const dict = await getDictionary(lng);

  const m = dict["our-project-page"]?.["musha-mines"] ?? {};

  return (
     <>

      {/* Hero section with video */}
      <div className="the-project-hero-section-wrapper">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="https://contents.trinity-metals.com/wp-content/uploads/2025/06/musha-1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Project description */}
      <div className="project-content-wrapper">
        <div className="container d-flex justify-content-center">
          <div className="information-project">
            <div className="project-title-element">
              <h1>{m["musha-mines-title"] ?? 'Musha Mines'}</h1>
            </div>

            {/* Stats row */}
            <div className="work-result row">
              <div className="col-md-4 stats">
                <div className="icon-element">
                  <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Black.svg"
                   height={52}
                   width={51}
                   imageName="productions data"
                   customClass="productions"
                   />
                </div>
                <div className="details-element">
                  <h4>{m["tin-production"] ?? ''}</h4>
                  <p>{m["tin-production-achievement"] ?? ''}</p>
                </div>
              </div>

              <div className="col-md-4 stats">
                <div className="icon-element">
                  <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Black-1.svg" 
                     height={50}
                   width={50}
                   imageName="productions data"
                   customClass="productions"
                  />
                </div>
                <div className="details-element">
                  <h4>{m["workforce"] ?? ''}</h4>
                  <p>{m["workforce-achievement"] ?? ''}</p>
                </div>
              </div>

              <div className="col-md-4 stats">
                <div className="icon-element">
                  <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Black-2.svg"
                    height={50}
                   width={43}
                   imageName="productions data"
                   customClass="productions"
                  />
                </div>
                <div className="details-element">
                  <h4>{m["location"] ?? ''}</h4>
                  <p>
                    {m["location-achievement"] ?? ''} <br />
                    {m["location-achievement1"] ?? ''}
                  </p>
                </div>
              </div>
            </div>

            {/* Brief history */}
            <div className="project-brief pt-3">
              <p className="fw-bold heading-20">
                {m["brief-history-desc"] ?? ''}
              </p>
              <p>{m["brief-history-desc1"] ?? ''}</p>
              <p>{m["brief-history-desc2"] ?? ''}</p>
              <p>{m["brief-history-desc3"] ?? ''}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Project site map */}
      <div className="main-map-parent">
        <div className="map-wrapper musha-map">
          {/* Add interactive map or static image here if needed */}
          {/* Example: <ImageGallery imageUrl="/musha-map.jpg" /> */}
        </div>
      </div>

      <div className="yellow-bg"></div>

    </>
  );
}

