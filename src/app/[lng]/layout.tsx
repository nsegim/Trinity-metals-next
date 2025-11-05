// app/[lng]/layout.tsx
import { dir } from 'i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import { Montserrat } from "next/font/google";
import { getDictionary } from '../i18n/dictionaries';
import { Locale, locales } from '../i18n/config';
import { TranslationProvider } from '../context/TranslationContext';
import { notFound } from 'next/navigation';

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export async function generateStaticParams() {
  return locales.map((lng) => ({ lng }));
}

// ✅ Simple props interface that matches Next.js expectations
interface Props {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}

export default async function RootLayout({ children, params }: Props) {
  const { lng } = await params;
  
  // ✅ Validate and cast the locale
  if (!locales.includes(lng as Locale)) {
    notFound(); // or redirect to default locale
  }
  
  const locale = lng as Locale;
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