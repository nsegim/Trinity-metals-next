// app/[lng]/investor/latest-news/page.tsx

import { getDictionary } from '@/app/i18n/dictionaries';
import { Locale, locales } from '@/app/i18n/config';
import ClientLatestNews from './ClientLatestNews';
import { Metadata } from 'next';
import './styles.css';


export const metadata: Metadata = {
  title: 'Latest News | Trinity Metals Limited',
  description:
    'Stay updated with Trinity Metals’ latest news, investment updates, and mining insights from Rwanda’s leading responsible tin, tungsten, and tantalum producer.',
  openGraph: {
    title: 'Latest News | Trinity Metals Limited',
    description:
      'Stay updated with Trinity Metals’ latest news, investment updates, and mining insights from Rwanda’s leading responsible tin, tungsten, and tantalum producer.',
    url: 'https://trinity-metals.com/investor-relations/latest-news',
  },
  alternates: {
    canonical: 'https://trinity-metals.com/investor-relations/latest-news',
  },
};

interface LatestNewsPageProps {
  params: Promise<{ lng: Locale }>;
}

export default async function LatestNewsPage({ params }: LatestNewsPageProps) {
  const { lng } = await params;
  const dict = await getDictionary(lng);

  return (
  
      <ClientLatestNews lng={lng} />
     
  );
}
