// components/NextJsFixes.tsx
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslation } from '@/app/context/TranslationContext';

export default function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { lang } = useTranslation();

  // SCROLL TO TOP ON EVERY NAVIGATION
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, searchParams]);

  // OPTIONAL: Update HTML lang attribute
  useEffect(() => {
    document.documentElement.lang = lang || 'en';
  }, [lang]);

  // This component renders nothing
  return null;
}