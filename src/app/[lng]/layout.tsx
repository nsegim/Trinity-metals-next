// app/[lng]/layout.tsx
import { dir } from 'i18next';
import { redirect } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import { Montserrat } from "next/font/google";
import { getDictionary } from '../i18n/dictionaries';
import { Locale, locales } from '../i18n/config';
import { TranslationProvider } from '../context/TranslationContext';
import { ReactNode } from 'react';
import SiteHeader from '@/components/layout/Header/Header';
import SiteFooter from '@/components/layout/Footer/Footer';
import Script from 'next/script'
import CookieBanner from '@/components/ui/CookieBanner';
import NotFound from './404/page';
import { ScrollToTop } from '@/components/common/ScrollToTop';



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
  params: Promise<{ lng: string }>; 
}) {
  const { lng } = await params;
  const dict = await getDictionary(lng as Locale);
  
  if (!locales.includes(lng as Locale)) {
    redirect(`/${locales[0]}`);
  }

  
  return (
    <html lang={lng} dir={dir(lng)}>
      <head>
         {/* 1. Set consent DENIED by default — must come first */}
         <Script id="google-consent-default" 
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'default', {
                  analytics_storage: 'denied',
                  ad_storage: 'denied'
                });
              `,
            }}
            
            >
         
          
        </Script>
        {/* Google tag (gtag.js)  */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-JWZLE57M1R"></Script>
     
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-JWZLE57M1R');
          
          `}
          
        </Script>
      </head>
      <body className={`${montserrat.variable} font-sans`}>
        <ScrollToTop />
        <TranslationProvider dict={dict} lang={lng}>
           
           <SiteHeader />
           {children}
           <CookieBanner />
           <SiteFooter />
          
        </TranslationProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams(): Promise<{ lng: Locale }[]> {
  return locales.map((lng) => ({ lng }));
}