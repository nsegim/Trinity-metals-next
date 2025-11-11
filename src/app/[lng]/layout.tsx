// app/[lng]/layout.tsx
import { dir } from 'i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import { Montserrat } from "next/font/google";
import { getDictionary } from '../i18n/dictionaries';
import { Locale, locales } from '../i18n/config';
import { TranslationProvider } from '../context/TranslationContext';
import { ReactNode } from 'react';
import SiteHeader from '@/components/layout/Header/Header';
import SiteFooter from '@/components/layout/Footer/Footer';
import ScrollToTop from '@/components/common/ScrollToTop';

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

// Remove custom type, let Next.js infer it
export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lng: string }>; // 👈 Keep as string for Next.js
}) {
  const { lng } = await params;
  const dict = await getDictionary(lng as Locale); // 👈 Cast when using


  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={`${montserrat.variable} font-sans`}>
        <TranslationProvider dict={dict} lang={lng}>
           {/* <ScrollToTop /> */}
           <SiteHeader />
          {children}
           <SiteFooter />

        </TranslationProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams(): Promise<{ lng: Locale }[]> {
  return locales.map((lng) => ({ lng }));
}