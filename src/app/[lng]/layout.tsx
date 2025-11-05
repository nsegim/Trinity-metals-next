// import type { Metadata } from "next";
// import { Montserrat } from "next/font/google";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "./globals.css";
// import TranslationProvider from "@/components/common/TranslationProvider";

// const montserrat = Montserrat({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-montserrat",
// });


// // const geistMono = Geist_Mono({
// //   variable: "--font-geist-mono",
// //   subsets: ["latin"],
// // });

// export const metadata = {
//   // title: {
//   //   default: 'Trinity Metals Limited',
//   //   template: '%s | Trinity Metals Limited'
//   // },
//   // description: 'Leading mining company in Rwanda',
//   openGraph: {
//     type: 'website',
//     siteName: 'Trinity Metals',
//   },
// }


// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`root`}
//       >
        
//         <TranslationProvider>
//           {children}
//         </TranslationProvider>
        
//       </body>
//     </html>
//   );
// }




// import { dir } from 'i18next'; // 👈 Needed for text direction
// import { languages } from '../../../i18n/settings';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "./globals.css";
// import { Montserrat } from "next/font/google";
// import { Metadata } from "next";
// import { getDictionary } from '../../../i18n/server';

// // 👇 Font setup
// const montserrat = Montserrat({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-montserrat",
// });

// // 👇 Metadata (optional)
// export const metadata = {
//   openGraph: {
//     type: 'website',
//     siteName: 'Trinity Metals',
//   },
// };
// export async function generateStaticParams() {
//   return languages.map((lng) => ({ lng }));
// }


// export default async function RootLayout({ children, params: { lng } }) {
//   // Load dictionary for the current language
//   const dict = await getDictionary(lng);
//   const currentLanguage = lng
  
//   return (
//     <html lang={currentLanguage} dir={dir(lng)}>
//       <body>
//         {children}
//       </body>
//     </html>
//   );
// }




// app/[lng]/layout.tsx ==== locale types for Vercel build
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

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ lng: Locale }>;
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps) {
  const { lng } = await params;
  const dict = await getDictionary(lng);

  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={`${montserrat.variable} font-sans`}>
        <TranslationProvider dict={dict}>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}

// THIS IS THE FIX — CAST TO LITERAL TYPE
export async function generateStaticParams() {
  return locales.map((lng) => ({
    lng: lng as Locale, // ← FORCE NARROWING
  }));
}