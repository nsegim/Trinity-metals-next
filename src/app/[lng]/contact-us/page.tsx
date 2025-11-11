// app/contact-us/page.tsx

import ImageGallery from "@/components/common/ImageGallery";
import './styles.css';
import { getDictionary } from '@/app/i18n/dictionaries';
import Form from 'react-bootstrap/Form';
import { Metadata } from "next";
import { Locale, locales } from '@/app/i18n/config';
import ContactForm from "./ContactForm"


export const metadata: Metadata = {
  title: 'Contact Us | Trinity Metals Limited',
  description:
    'Get in touch with Trinity Metals Limited for inquiries, partnerships, or media requests. We’re here to support responsible mining and sustainable growth in Rwanda.',
  openGraph: {
    title: 'Contact Us | Trinity Metals Limited',
    description:
      'Get in touch with Trinity Metals Limited for inquiries, partnerships, or media requests. We’re here to support responsible mining and sustainable growth in Rwanda.',
    url: 'https://trinity-metals.com/contact-us',
  },
  alternates: {
    canonical: 'https://trinity-metals.com/contact-us',
  },
};



interface ContactUsPageProps {
  params: Promise<{ lng: Locale }>;
}

export default async function page( { params }: ContactUsPageProps) {
  const { lng } = await params;
  const dict = await getDictionary(lng);

  return (
    <>
      

      {/* Hero Map */}
      <div className="map-section-on">
        <iframe
          src="https://www.google.com/maps/d/u/0/embed?mid=100vTr8CO2dKGx-fwP17brI9aZTt8ah4&ehbc=2E312F"
          width="100%"
          height="500"
          loading="lazy"
        />
      </div>

      {/* Get in Touch */}
      <div className="get-in-touchSection">
        <div className="container">
          <div className="row">
            <div className="col-md-6 left">
              <div className="get-in-touch"></div>
              <div className="contact-details">
                <p>{dict.Contact["contact-details"]}</p>
                <p>
                  <ImageGallery
                    imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Cell-phone-icon-4.svg"
                    imageName="Phone Icon"
                    customClass="Cell-phone"
                    width={32}
                    height={33}
                  />
                  <span> {dict.Contact["contact-tel"]}</span>
                </p>
              </div>
            </div>

            <div className="col-md-6 right">
              <div className="right-header">
                <h2>{dict.Contact["get-in-touch"]}</h2>
              </div>

              <div className="form-wrapper">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Locations */}
      <div className="container location-wrapper">
        <div className="row">
          {[
            { name: "location-rutongo-name", email: "location-rutongo-details-email", address: "location-rutongo-detaisl-address", phone: "location-rutongo-detaisl-phone" },
            { name: "location-nyakabingo-name", email: "location-nyakabingo-details-email", address: "location-nyakabingo-detaisl-address", phone: "location-nyakabingo-detaisl-phone" },
            { name: "location-musha-name", email: "location-musha-details-email", address: "location-musha-detaisl-address", phone: "location-musha-detaisl-phone" },
          ].map((loc, i) => (
            <div key={i} className="col-md-4">
              <div className="location-name">
                <h4>{dict[loc.name]}</h4>
              </div>
              <div className="location-details">
                <ul>
                  <li>{dict["Contact"][loc.email]}</li>
                  <li>{dict["Contact"][loc.address]}</li>
                  <li>{dict["Contact"][loc.phone]}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );
}

