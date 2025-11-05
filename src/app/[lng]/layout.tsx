// app/[lng]/layout.tsx
import { dir } from 'i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import { Montserrat } from "next/font/google";
import { getDictionary } from '../i18n/dictionaries';
import { Locale, locales } from '../i18n/config';
import { TranslationProvider } from '../context/TranslationContext';
import { ReactNode } from 'react';

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

interface LayoutProps {
  children: ReactNode;
  params: Promise<{
    lng: string; // Accept string here to match Next.js inference
  }>;
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps) {
  const { lng } = await params;
  
  // ✅ Type assertion to convert string to Locale
  const locale = lng as Locale;
  
  // ✅ Optional: Add runtime validation
  if (!locales.includes(locale)) {
    // Handle invalid locale - redirect or show error
    throw new Error(`Invalid locale: ${locale}`);
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

export async function generateStaticParams() {
  return locales.map((lng) => ({ lng }));
}