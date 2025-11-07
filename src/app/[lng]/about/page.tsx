// app/[lng]/about/page.tsx

import './styles.css';
import { fetchData } from '../../../../lib/config/apiConfig';
import { getDictionary } from '@/app/i18n/dictionaries';
import { Locale } from '@/app/i18n/config';
import { Metadata } from 'next';
import ClientAbout from './ClientAbout'; // ← Client wrapper for modals + scroll

export const metadata: Metadata = {
  title: "About Us | Trinity Metals Limited",
  description: "Learn about Trinity Metals Limited’s formation from three major Rwandan mining companies...",
  openGraph: {
    title: "About Us | Trinity Metals Limited",
    description: "Learn about Trinity Metals Limited’s formation...",
    url: "https://trinity-metals.com/about",
  },
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lng: Locale }>;
}) {
  const { lng } = await params;
  const dict = await getDictionary(lng);

  // Fetch members server-side
  let data = [];
  let error = null;
  try {
    const response = await fetchData('member-showcase?per_page=100&_embed');
    data = response;
  } catch (err) {
    error = err;
    console.error(err);
  }

  return (
      <>
          <ClientAbout initialData={data} initialError={error} dict={dict} lng={lng} />
       </>
  );
}

export async function generateStaticParams() {
  return ['en', 'kiny'].map((lng) => ({ lng }));
}