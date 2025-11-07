// app/[lng]/investor-relations/reports/page.tsx

import { getDictionary } from '@/app/i18n/dictionaries';
import { Locale, locales } from '@/app/i18n/config';
import ClientReports from './ClientReports';

import { Metadata } from 'next';
import './styles.css';

export const metadata: Metadata = {
  title: 'Reports | Trinity Metals Limited',
  description: 'Access the latest due diligence reports, policies, and sustainability documents from Trinity Metals.',
  openGraph: {
    title: 'Reports | Trinity Metals Limited',
    url: 'https://trinity-metals.com/investor-relations/reports',
  },
  alternates: {
    canonical: 'https://trinity-metals.com/investor-relations/reports',
  },
};

interface ReportsPageProps {
  params: Promise<{ lng: Locale }>;
}

export default async function ReportsPage({ params }: ReportsPageProps) {
  const { lng } = await params;
  const dict = await getDictionary(lng);

  return (
   
      <ClientReports lng={lng} />
     
  );
}

