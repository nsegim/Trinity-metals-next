// app/disclaimer/page.tsx
'use client'
import { getDictionary } from "@/app/i18n/dictionaries";
import { useTranslation } from "../../context/TranslationContext";
import { Locale, locales } from '../../i18n/config'
import "./styles.css";

export default function Disclaimer() {

   const { dict } = useTranslation()
  return (
    <>

      {/* Hero */}
      <div className="custom-hero20">
        <div className="child-item-wrapper z-1">
          <h1 className="heading text-uppercase">
            {dict.desclaimer["desclaimer-title"]}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="project-content-wrapper">
        <div className="container d-flex justify-content-center pb-5">
          <div className="information-project custom-margin">
            <div className="disclaimer project-brief">
              <p>
                <b>{dict.desclaimer["desclaimer-desc"]}</b>
              </p>
              <p>{dict.desclaimer["desclaimer-desc1"]}</p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
