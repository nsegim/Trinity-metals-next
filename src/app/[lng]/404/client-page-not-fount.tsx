'use client';
import Link from "next/link";
import { useTranslation } from "@/app/context/TranslationContext";



export default function NotFoundClient() {
    const { dict, lang } = useTranslation();

  return (
    <main className="page-404">
      <div className="bg-texture" />
      <div className="scan-line" />
      <div className="mine-silhouette" />

      <div className="content-404">
        <div className="ore-icon">
          <span className="ore-dot" />
          <span className="ore-dot" />
          <span className="ore-dot" />
        </div>

        <p className="error-label">Trinity Metals — Error</p>

        <div className="number-wrap">
          <div className="big-404">404</div>
          <div className="big-404-fill">404</div>
        </div>

        <h1 className="error-headline"> Page Not Found</h1>
        <p className="error-desc">
          
        </p>

        <div className="error-actions">
          <Link href={`/${lang}`} className="btn-primary-404">
            Back to Home
          </Link>
          <Link href={`/${lang}/contact-us`} className="btn-outline-404">
            Contact Us
          </Link>
        </div>
      </div>

      <div className="bottom-bar" />
    </main>
  );
}