// app/[lng]/sustainability/page.tsx
import ImageGallery from '@/components/common/ImageGallery';
import { getDictionary } from '@/app/i18n/dictionaries';
import { Locale, locales } from '@/app/i18n/config';
import ClientSustainability from './ClientSustainability';
import { Metadata } from 'next';
import './styles.css'; // ← your CSS

export const metadata: Metadata = {
  title: 'Sustainability | Trinity Metals Limited',
  description:
    'Trinity Metals leads responsible mining in Rwanda, advancing UN SDGs through environmental protection, community growth, and sustainable impact.',
  openGraph: {
    title: 'Sustainability | Trinity Metals Limited',
    description:
      'Trinity Metals leads responsible mining in Rwanda, advancing UN SDGs through environmental protection, community growth, and sustainable impact.',
    url: 'https://trinity-metals.com/sustainability',
  },
  alternates: {
    canonical: 'https://trinity-metals.com/sustainability',
  },
};

interface SustainabilityPageProps {
  params: Promise<{ lng: Locale }>;
}

export default async function page({ params }: SustainabilityPageProps) {
  const { lng } = await params;
  const dict = await getDictionary(lng);

  return (
   
      <ClientSustainability lng={lng} />
  );
}

export async function generateStaticParams() {
  return locales.map((lng) => ({ lng }));
}