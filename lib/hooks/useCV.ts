'use client';

import { useState, useEffect } from 'react';
import { getCVData, CVData } from '../cv-parser';

interface UseCVResult {
  cvData: CVData | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

/**
 * Custom hook to manage CV data across components
 * This provides a single source of truth for CV data
 */
export function useCV(): UseCVResult {
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCVData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCVData();
      setCvData(data);
    } catch (err) {
      console.error("Failed to load CV data:", err);
      setError(err instanceof Error ? err : new Error('Unknown error loading CV data'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCVData();
  }, []);

  const refresh = async () => {
    await fetchCVData();
  };

  return { cvData, loading, error, refresh };
}

export default useCV; 