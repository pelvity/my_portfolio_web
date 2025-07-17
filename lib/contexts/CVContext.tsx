'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { CVData } from '../cv-parser';
import useCV from '../hooks/useCV';

interface CVContextType {
  cvData: CVData | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

interface CVProviderProps {
  children: ReactNode;
}

export const CVProvider: React.FC<CVProviderProps> = ({ children }) => {
  const cvState = useCV();
  
  return (
    <CVContext.Provider value={cvState}>
      {children}
    </CVContext.Provider>
  );
};

export const useCVContext = (): CVContextType => {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error('useCVContext must be used within a CVProvider');
  }
  return context;
};

export default CVContext; 