'use client';

import React, { ReactNode } from 'react';
import { createGlobalStyle } from 'styled-components';

// We need a minimal GlobalStyle for React95 components, even though the
// main stylesheet is imported in page.tsx
const React95GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Pixelated MS Sans Serif', 'MS Sans Serif', sans-serif;
    font-size: 12px;
  }
  
  /* Ensure proper cursor styles for win95 UI */
  .win95-pointer {
    cursor: pointer;
  }
  
  .win95-default {
    cursor: default;
  }
`;

interface React95WrapperProps {
  children: ReactNode;
}

const React95Wrapper: React.FC<React95WrapperProps> = ({ children }) => {
  return (
    <>
      <React95GlobalStyle />
      {children}
    </>
  );
};

export default React95Wrapper; 