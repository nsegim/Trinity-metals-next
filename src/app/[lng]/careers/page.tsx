// app/careers/page.tsx

import CareersClient from "./CareersClient";
// import { Helmet } from "react-helmet-async";
import { getDictionary } from '@/app/i18n/dictionaries';
 import { Locale } from '@/app/i18n/config';


export const metadata = {
  title: "Careers | Trinity Metals Limited",
  description: "Join Trinity Metals Limited: empowering communities, creating jobs, and promoting gender diversity in mining.",
  openGraph: {
    title: "Careers | Trinity Metals Limited",
    description: "Join Trinity Metals Limited: empowering communities, creating jobs, and promoting gender diversity in mining.",
    url: "https://trinity-metals.com/careers",
  },
};

export  default async function  CareersPage(
  {
      params,
  }: {
      params: Promise<{ lng: Locale }>;
  }
) {

  const { lng } = await params;

  const dict = await getDictionary(lng); 

  return (
    <>
      {/* <Helmet>
        <link rel="canonical" href="https://trinity-metals.com/careers" />
      </Helmet> */}


      {/* Hero */}
      <div className="custom-hero video-gallery">
        <div className="child-item-wrapper z-1">
          <h1 className="heading text-uppercase">{(dict.header.careers)}</h1>
        </div>
      </div>

      {/* Client Component */}
      <CareersClient />

    </>
  );
}