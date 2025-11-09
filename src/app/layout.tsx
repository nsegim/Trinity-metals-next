// app/[lng]/layout.tsx
import { dir } from 'i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
// import "../globals.css";

import { ReactNode } from 'react';
import SiteHeader from '@/components/layout/Header/Header';
import SiteFooter from '@/components/layout/Footer/Footer';

// Remove custom type, let Next.js infer it
export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lng: string }>; // 👈 Keep as string for Next.js
}) {
  
  return (
    <html lang="en">
      <body>
           {children}

      </body>
    </html>
  );
}

