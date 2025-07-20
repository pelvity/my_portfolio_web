'use client';

import React from 'react';
import { createGlobalStyle } from 'styled-components';

// Define global styles for fonts
const FontStyles = createGlobalStyle`
  /* MS Sans Serif font definitions */
  @font-face {
    font-family: 'Pixelated MS Sans Serif';
    src: url('/fonts/ms_sans_serif.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'Pixelated MS Sans Serif';
    src: url('/fonts/ms_sans_serif_bold.woff2') format('woff2');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }
  
  /* React95 icons font */
  @font-face {
    font-family: 'React95Icons';
    src: url('https://unpkg.com/@react95/icons/dist/react95-icons.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: block;
  }

  /* These additional styles enhance the Win95 look when using @react95/core */
  html {
    font-size: 12px;
  }
  
  body {
    font-family: 'Pixelated MS Sans Serif', 'MS Sans Serif', sans-serif;
    font-size: 12px;
    font-smooth: never;
    -webkit-font-smoothing: none;
  }
  
  button, input, select, textarea {
    font-family: 'Pixelated MS Sans Serif', 'MS Sans Serif', sans-serif;
    font-size: 12px;
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
        <span style={{ fontFamily: 'Pixelated MS Sans Serif' }}>
          ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
        </span>
        <span style={{ fontFamily: 'React95Icons' }}>
          ▲▼◀▶■□●○
        </span>
      </div>
    </>
  );
};

export default FontPreload; 