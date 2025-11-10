// app/careers/page.tsx

import CareersClient from "./CareersClient";
// import { Helmet } from "react-helmet-async";

export const metadata = {
  title: "Careers | Trinity Metals Limited",
  description: "Join Trinity Metals Limited: empowering communities, creating jobs, and promoting gender diversity in mining.",
  openGraph: {
    title: "Careers | Trinity Metals Limited",
    description: "Join Trinity Metals Limited: empowering communities, creating jobs, and promoting gender diversity in mining.",
    url: "https://trinity-metals.com/careers",
  },
};

export default function CareersPage() {
  return (
    <>
      {/* <Helmet>
        <link rel="canonical" href="https://trinity-metals.com/careers" />
      </Helmet> */}


      {/* Hero */}
      <div className="custom-hero video-gallery">
        <div className="child-item-wrapper z-1">
          <h1 className="heading text-uppercase">Careers</h1>
        </div>
      </div>

      {/* Client Component */}
      <CareersClient />

    </>
  );
}