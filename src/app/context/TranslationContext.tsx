"use client";

import { createContext, useContext, ReactNode } from "react";

type TranslationDict = Record<string, string>;

const TranslationContext = createContext<TranslationDict | null>(null);

interface TranslationProviderProps {
  dict: TranslationDict;
  children: ReactNode;
}

export function TranslationProvider({ dict, children }: TranslationProviderProps) {
  return (
    <TranslationContext.Provider value={dict}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation(): TranslationDict {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used inside a TranslationProvider");
  }
  return context;
}
