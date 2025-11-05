"use client";

import { createContext, useContext } from "react";

const TranslationContext = createContext(null);

export function TranslationProvider({ dict, children }) {
  return (
    <TranslationContext.Provider value={dict}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used inside a TranslationProvider");
  }
  return context;
}
