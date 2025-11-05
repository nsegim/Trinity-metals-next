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
import { dir } from 'i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import { Montserrat } from "next/font/google";
import { getDictionary } from '../i18n/dictionaries';
import { locales } from '../i18n/config'; // Make sure this exports your array of locales
import { TranslationProvider } from '../context/TranslationContext';
import { ReactNode } from 'react';

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

// 1. **CRITICAL FIX**: Change the type of 'lng' from 'Locale' to 'string'.
//    This resolves the TypeScript conflict with Next.js internal types.
type LayoutProps = {
  children: ReactNode;
  params: { lng: string }; 
};


export default async function RootLayout({
  children,
  params,
}: LayoutProps) {
  // Access lng directly from params, it is no longer a Promise
  const lng = params.lng;
  
  // You might want to cast this or validate it if your getDictionary requires the strict type
  const dict = await getDictionary(lng); 

  return (
    <html lang={lng} dir={"rtl"}>
      <body className={`${montserrat.variable} font-sans`}>
        <TranslationProvider dict={dict}>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}

// 2. This function confirms to Next.js what valid routes exist during the build.
export async function generateStaticParams() {
  return locales.map((lng) => ({
    lng: lng,
  }));
}
