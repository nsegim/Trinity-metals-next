// app/[lng]/layout.tsx
import { dir } from 'i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import { Montserrat } from "next/font/google";
import { getDictionary } from '../i18n/dictionaries';
import { Locale, locales, defaultLocale } from '../i18n/config';
import { TranslationProvider } from '../context/TranslationContext';

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export async function generateStaticParams() {
  return locales.map((lng) => ({ lng }));
}

interface Props {
  children: React.ReactNode;
  params: Promise<{ lng?: string }>; // Make lng optional
}

export default async function RootLayout({ children, params }: Props) {
  const { lng } = await params;
  
  // ✅ Use default locale if lng is missing or invalid
  let locale: Locale = defaultLocale;
  
  if (lng && locales.includes(lng as Locale)) {
    locale = lng as Locale;
  }
  
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={`${montserrat.variable} font-sans`}>
        <TranslationProvider dict={dict}>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}