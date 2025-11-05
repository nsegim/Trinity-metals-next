import React from 'react'
import { getDictionary } from '@/app/i18n/dictionaries';
 import { Locale, locales } from '@/app/i18n/config';
 import dynamic from 'next/dynamic';


export default async function page({
             params,
          }: {
              params: Promise<{ lng: Locale }>;
          }) {


             // ← UNWRAP THE PROMISE
  const { lng } = await params;

  // Now safe to use
  const dict = await getDictionary(lng);

  return (
    <div className='about'>  {(dict.home["rwandan-workforce"])} </div>
  )
}
