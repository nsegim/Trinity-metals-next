// app/[lng]/our-projects/page.tsx
import ImageGallery from '@/components/common/ImageGallery';
import { getDictionary } from '@/app/i18n/dictionaries';
import { Locale, locales } from '@/app/i18n/config';
import Link from 'next/link';
import { Metadata } from 'next';
import './styles.css';

export const metadata: Metadata = {
  title: 'Our Projects | Trinity Metals Limited',
  description:
    'Trinity Metals operates three certified conflict-free mining projects in Rwanda, upholding strict ESG and sustainable mining standards.',
  keywords:
    'Trinity Metals Projects, Rutongo Mines, Nyakabingo Mine, Musha Mines, Ntunga Lithium Project, Responsible Mining Rwanda, ESG Mining, Conflict-Free Minerals',
  openGraph: {
    title: 'Our Projects | Trinity Metals Limited',
    description:
      'Explore Trinity Metals Limited’s mining operations in Rwanda – Rutongo, Nyakabingo, and Musha Mines. Operated responsibly under ESG and OECD conflict-free standards.',
    type: 'website',
    url: 'https://trinity-metals.com/our-projects',
  },
  alternates: {
    canonical: 'https://trinity-metals.com/our-projects',
  },
};

interface ProjectsPageProps {
  params: Promise<{ lng: Locale }>;
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { lng } = await params;
  const dict = await getDictionary(lng);

  return (
      <>

      {/* Hero Section */}
      <div className="project-section-wrapper">
        <div className="inner-wrapper">
          <h1 className="heading text-uppercase">
            {dict["our-project-page"]?.["projects-title"]}
          </h1>
        </div>
      </div>

      {/* Projects Section */}
      <div className="projects-section-holder">
        <div className="container">
          <div className="inner-section-header">
            <h2>{dict["our-project-page"]?.["projects-sub-title"]}</h2>
          </div>

          <div className="projects-description pb-3">
            <p>
              <b
                dangerouslySetInnerHTML={{
                  __html: dict["our-project-page"]?.["project-description-1"] || '',
                }}
              />
            </p>
            <p>{dict["our-project-page"]?.["project-description-2"]}</p>
            <p>{dict["our-project-page"]?.["project-description-3"]}</p>
          </div>

          <div className="projects-cards-wrapper">
            {/* Nyakabingo */}
            <div className="project-card card-item card1">
              <div className="project-name">
                <h4>{dict["our-project-page"]?.["project-sites"]?.["trinity-nyakabingo-mine"]}</h4>
              </div>
              <div className="read-more-about">
                <Link href={`/${lng}/projects/nyakabingo-mine`}>
                  <span className="button-name">{dict.home?.["read-more-button"]}</span>
                  <span className="button-icon">
                    <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/arrow-icon.svg" height={25}
        width={26}  imageName={"Read More"} customClass={"Read-more-icon"}  alt={undefined}/>
                  </span>
                </Link>
              </div>
            </div>

            {/* Musha */}
            <div className="project-card card-item card2">
              <div className="project-name">
                <h4>{dict["our-project-page"]?.["project-sites"]?.["trinity-musha-mines"]}</h4>
              </div>
              <div className="read-more-about">
                <Link href={`/${lng}/projects/musha-mine`}>
                  <span className="button-name">{dict.home?.["read-more-button"]}</span>
                  <span className="button-icon">
                    <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/arrow-icon.svg" height={25}
        width={26}  imageName={"Read More"} customClass={"Read-more-icon"} alt={undefined}/>
                  </span>
                </Link>
              </div>
            </div>

            {/* Rutongo */}
            <div className="project-card card-item card3">
              <div className="project-name">
                <h4>{dict["our-project-page"]?.["project-sites"]?.["trinity-rutongo-mines"]}</h4>
              </div>
              <div className="read-more-about">
                <Link href={`/${lng}/projects/rutongo-mine`}>
                  <span className="button-name">{dict.home?.["read-more-button"]}</span>
                  <span className="button-icon">
                    <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/arrow-icon.svg" height={25}
        width={26}  imageName={"Read More"} customClass={"Read-more-icon"} alt={undefined}/>
                  </span>
                </Link>
              </div>
            </div>

            {/* Lithium Exploration */}
            <div className="project-card card-item card4">
              <div className="project-name">
                <h4>{dict["our-project-page"]?.["project-sites"]?.["LITHIUM-EXPLORATION"]}</h4>
              </div>
              <div className="read-more-about">
                <Link href={`/${lng}/projects/lithium`}>
                  <span className="button-name">{dict.home?.["read-more-button"]}</span>
                  <span className="button-icon">
                    <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/arrow-icon.svg" height={25}
        width={26}  imageName={"Read More"} customClass={"Read-more-icon"} alt={undefined}/>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="yellow-bg"></div>
    </>  

  );
}

export async function generateStaticParams() {
  return locales.map((lng) => ({ lng }));
}