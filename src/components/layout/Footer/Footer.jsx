
"use client"
import { Form, Button } from "react-bootstrap";
import { useTranslation } from "@/app/context/TranslationContext";
import "./footer.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ImageGallery from "../../common/ImageGallery";

const SiteFooter = () => {
  const {dict, lang} = useTranslation()
  const location = usePathname()
  return (
    <>
      <div className="footer row gap-0">
        <div className="map-section col-md-6">
           <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1ffI0qI2TP6XhTJ3XH-uY88v6aA-v0YE&ehbc=2E312F&noprof=1" width="100%" height="100%" className="footerMap"></iframe>   
        </div>
        <div className="footer-content-wrapper col-md-6">
          <div className="inner-content-wrapper d-flex flex-column">
              <div className="the-newsLetter">
                <h2 className="footer-heading">{(dict.footer["subscribe-newsletter"])}</h2>

                <div className="formWrapper">
                  <Form className="newsletter-form">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="email"
                        placeholder={(dict.footer["your-email"])}

                        className="email-field"
                      />
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      className="newsletterSubmitBtn"
                    >
                      {(dict.footer.subscribe)}
                    </Button>
                  </Form>
                </div>
              </div>
              <div className="include-location d-flex">
                <div className="quickLinksWrapper">
                  <h2 className="footer-heading"> {(dict.footer["quick-links"])}</h2>

                      <div className="the-links">
                        <div className="links001">
                          <ul className="quick-links">
                            <li>
                              <Link href={`/${lang}`} className="footer-links">{(dict.header.home)}</Link>
                            </li>
                            <li>
                              <Link href={`/${lang}/about`} className="footer-links"> {(dict.header["about-us"])}</Link>
                            </li>
                            <li>
                              <Link href={`/${lang}/investor/latest-news`} className="footer-links">{(dict.header.investor["latest-news"])}</Link>
                            </li>
                          </ul>
                        </div>
                        <div className="links002">
                          <ul className="quick-links">
                            <li>
                              <Link href={`/${lang}/projects`} className="footer-links">{(dict.footer["mining-projects"])}</Link>
                            </li>
                            <li>
                              <Link href={`/${lang}/sustainability`} className="footer-links"> {(dict.header.sustainability)}</Link>
                            </li>
                            <li>
                              <Link href={`/${lang}/careers`} className="footer-links"> {(dict.header.careers)}</Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                </div>
                
                  {  location === `/${lang}/projects/musha-mine` ? (
                          
                        <div className="mine-site-location">  
                          <h4> {(dict.footer["trinity-musha-mine"])}</h4>
                          <ul>
                              <li>
                                 {(dict.footer["mine-projects"]["Eastern-province"])}
                              </li>
                              <li>
                                Musha, Rwamagana
                              </li>
                              <li>
                                P.O Box: 3824, Kigali-Rwanda
                              </li>
                              <li>
                                Musha@trinity-metals.com
                              </li>
                              <li>
                                +250 789 312 308
                              </li>
                         </ul>
                        </div> 
                      ) : location === `/${lang}/projects/nyakabingo-mine` ?(
                        <div className="mine-site-location">  
                          <h4> {(dict.home["trinity-Nyakabingo-mine"])}</h4>
                          <ul>
                              <li>
                               {(dict.footer["mine-projects"]["Northern-province"])}
                              </li>
                              <li>
                                Shyorongi, Rulindo
                              </li>
                              <li>
                                P.O Box: 749, Kigali-Rwanda
                              </li>
                              <li>
                                Nyakabingo@trinity-metals.com
                              </li>
                              <li>
                                +250 791 345 409
                              </li>
                         </ul>
                        </div>
                      ): location === `/${lang}/projects/rutongo-mine` ?(
                        <div className="mine-site-location">  
                          
                          <h4> {(dict.footer["rutongo-mine"])}</h4>
                          <ul>
                              <li>
                                {(dict.footer["mine-projects"]["Northern-province"])}
                              </li>
                              <li>
                                Masoro, Rulindo
                              </li>
                              <li>
                                P.O Box: 6132 Kigali-Rwanda
                              </li>
                              <li>
                                rutongo@trinity-metals.com
                              </li>
                              <li>
                                +250 791 701 498
                              </li>
                         </ul>
                        </div>
                      ): (
                         <div></div>
                      ) 
                    
                  }
                  
                
              </div>
             
            
                  <div className="contact-info-section">
                    <div className="icon-box">
                      <a href="tel:+25091959034">
                         <span>
                           <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Yellow-Phone.svg" imageName={undefined} customClass={undefined} width={65} height={65} />
                         </span>
                      </a>
                     
                      <div className="text-element">
                        <p className="header-element"> {(dict.footer["all-us"])}</p>

                        <a href="tel:+250791959034" className="reach-contact">+250 791 959 034</a>
                      </div>
                      
                    </div>
                    <div className="icon-box">
                      <span>
                        <a href="mailto:info.rw@trinity-metals.com">
                          <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Yellow-envelope.svg" imageName={undefined} customClass={undefined} width={65} height={65} />
                        </a>
                      </span>
                      <div className="text-element">
                        <p className="header-element">{(dict.footer["write-to-us"])}</p>

                        <a href="mailto:info.rw@trinity-metals.com" className="reach-contact">
                          info.rw@trinity-metals.com
                        </a>
                      </div>
                    </div>
                  </div>

          </div>
          

         
         
        </div>
      </div>
      <div className="bottom-section">
        <div className="container copyright">
          <p>Copyright © TRINITY METALS 2025  All Right Reserved </p>
           <Link href={`/${lang}/disclaimer`} className="footer-links">Disclaimer</Link>
          
        </div>
      </div>
    </>
  );
};

export default SiteFooter;
