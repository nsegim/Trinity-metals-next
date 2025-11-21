// app/[lng]/our-projects/nyakabingo/page.tsx
import ImageGallery from '@/components/common/ImageGallery';
import { getDictionary } from '@/app/i18n/dictionaries';
import { Locale, locales } from '@/app/i18n/config';
import { Metadata } from 'next';
import '../min-styles.css'; // ← your existing Nyakabingo CSS

export const metadata: Metadata = {
  title: 'Nyakabingo Mine | Trinity Metals Limited',
  description:
    'Explore Nyakabingo Mine – Trinity Metals’ premier tungsten operation in Rwanda, committed to responsible mining and community development.',
  openGraph: {
    title: 'Nyakabingo Mine | Trinity Metals Limited',
    description:
      'Discover Nyakabingo, a key tungsten mining site operated by Trinity Metals under strict ESG and conflict-free standards.',
    url: 'https://trinity-metals.com/our-projects/nyakabingo',
  },
  alternates: {
    canonical: 'https://trinity-metals.com/our-projects/nyakabingo',
  },
};

interface NyakabingoPageProps {
  params: Promise<{ lng: Locale }>;
}

export default async function page({ params }: NyakabingoPageProps) {
  const { lng } = await params;
  const dict = await getDictionary(lng);

  const n = dict["our-project-page"]?.["nyakabingo-mines"] ?? {};

  return (
    <>

      {/* Hero section with video */}
      <div className="the-project-hero-section-wrapper">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="https://contents.trinity-metals.com/wp-content/uploads/2025/06/nyakibingo-1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Project description */}
      <div className="project-content-wrapper">
        <div className="container d-flex justify-content-center">
          <div className="information-project">
            <div className="project-title-element">
              <h1>{n["nyakabingo-mines-title"] ?? 'Nyakabingo Mine'}</h1>
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
                   alt={undefined}
                  />
                </div>
                <div className="details-element">
                  <h4>{n["tungsten-production"] ?? ''}</h4>
                  <p>{n["tungsten-production-achievement"] ?? ''}</p>
                </div>
              </div>

              <div className="col-md-4 stats">
                <div className="icon-element">
                  <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Black-1.svg"
                    height={52}
                   width={51}
                   imageName="productions data"
                   customClass="productions"
                   alt={undefined}
                  />
                </div>
                <div className="details-element">
                  <h4>{n["workforce"] ?? ''}</h4>
                  <p>{n["workforce-achievement"] ?? ''}</p>
                </div>
              </div>

              <div className="col-md-4 stats">
                <div className="icon-element">
                  <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Black-2.svg"
                    height={52}
                   width={51}
                   imageName="productions data"
                   customClass="productions"
                   alt={undefined}
                   />
                </div>
                <div className="details-element">
                  <h4>{n["location"] ?? ''}</h4>
                  <p>
                    {n["location-achievement"] ?? ''}<br />
                    {n["location-achievement1"] ?? ''}
                  </p>
                </div>
              </div>
            </div>

            {/* Brief history */}
            <div className="project-brief pt-3">
              <p className="fw-bold heading-20">
                {n["history-timeline-desc"] ?? ''}
              </p>
              <p>{n["history-timeline-desc1"] ?? ''}</p>
              <p>{n["history-timeline-desc2"] ?? ''}</p>
              <p>{n["history-timeline-desc3"] ?? ''}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Project site map */}
      <div className="main-map-parent">
        <div className="map-wrapper nyakabingo-map">
          {/* Optional: add static map */}
          {/* <ImageGallery imageUrl="/nyakabingo-map.jpg" customClass="w-100" /> */}
        </div>
      </div>

      <div className="yellow-bg"></div>

    </>  

  )}