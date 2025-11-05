// app/[lng]/layout.tsx
import { dir } from 'i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import { Montserrat } from "next/font/google";
import { getDictionary } from '../i18n/dictionaries';
import { Locale, locales } from '../i18n/config';
import { TranslationProvider } from '../context/TranslationContext';

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

// ✅ Using Next.js types directly
interface Props {
  children: React.ReactNode;
  params: Promise<{
    lng: Locale;
  }>;
}

export default async function RootLayout(props: Props) {
  // ✅ Destructure after awaiting
  const params = await props.params;
  const { lng } = params;
  
  const dict = await getDictionary(lng);

  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={`${montserrat.variable} font-sans`}>
        <TranslationProvider dict={dict}>
          {props.children}
        </TranslationProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return locales.map((lng) => ({ lng }));
}