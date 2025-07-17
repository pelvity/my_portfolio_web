'use client';

import React from 'react';
import { createGlobalStyle } from 'styled-components';

// Define global styles for fonts
const FontStyles = createGlobalStyle`
  /* Add MS Sans Serif font definitions if needed */
  @font-face {
    font-family: 'MS Sans Serif';
    src: local('MS Sans Serif');
    font-display: swap;
  }
  
  @font-face {
    font-family: 'Pixelated MS Sans Serif';
    src: local('Pixelated MS Sans Serif');
    font-display: swap;
  }
`;

const FontPreload: React.FC = () => {
  return (
    <>
      <FontStyles />
      {/* Preload sample text with zero opacity to help browsers load fonts */}
      <div style={{ 
        position: 'absolute', 
        width: 0, 
        height: 0, 
        overflow: 'hidden', 
        opacity: 0 
      }}>
        <span style={{ fontFamily: 'MS Sans Serif' }}>
          ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
        </span>
        <span style={{ fontFamily: 'Pixelated MS Sans Serif' }}>
          ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
        </span>
        <span style={{ fontFamily: 'React95Video-Numbers' }}>
          0123456789
        </span>
      </div>
    </>
  );
};

export default FontPreload; 