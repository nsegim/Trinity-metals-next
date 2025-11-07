"use client";

import { createContext, useContext, ReactNode } from "react";

type TranslationDict = Record<string, string>;

interface TranslationContextValue {
  dict: TranslationDict;
  lang: string; // Assuming lang is a simple string like 'en', 'kiny', etc.
}



const TranslationContext = createContext<TranslationContextValue | null>(null);

interface TranslationProviderProps {
  dict: TranslationDict;
  lang : string;
  children: ReactNode;
}

export function TranslationProvider({ dict, lang, children }: TranslationProviderProps) {


  const value = { dict, lang };

  return (
    <TranslationContext.Provider value={value} >
      {children}
    </TranslationContext.Provider>
  );
}


export function useTranslation(): TranslationContextValue {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used inside a TranslationProvider");
  }
  return context;
}
