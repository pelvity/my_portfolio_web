import { createGlobalStyle } from 'styled-components';

// This component provides global styles for the entire application
// to replace the @react95/core/GlobalStyle which is no longer exported
const GlobalStyles = createGlobalStyle`
  /* Win95 color palette */
  :root {
    --win95-gray: #c0c0c0;
    --win95-darker-gray: #a0a0a0;
    --win95-darkest-gray: #808080;
    --win95-blue: #000080;
    --win95-cyan: #008080;
    --win95-white: #ffffff;
    --win95-black: #000000;
    --win95-shadow-black: rgba(0, 0, 0, 0.5);
  }

  /* Reset and base styles */
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  
  body {
    background-color: var(--win95-cyan);
    color: var(--win95-black);
    font-family: 'Pixelated MS Sans Serif', 'MS Sans Serif', sans-serif;
    font-size: 12px;
    font-smooth: never;
    -webkit-font-smoothing: none;
  }
  
  /* Windows 95 UI elements styling */
  button, input, select, textarea {
    font-family: 'Pixelated MS Sans Serif', 'MS Sans Serif', sans-serif;
    font-size: 12px;
  }

  /* Windows 95 button styles */
  button {
    background-color: var(--win95-gray);
    border-width: 1px;
    border-style: solid;
    border-color: var(--win95-white) var(--win95-black) var(--win95-black) var(--win95-white);
    padding: 0 10px;
    height: 20px;
    box-shadow: 1px 1px 0px var(--win95-darker-gray);
    position: relative;
    outline: none;
    
    &:active {
      border-color: var(--win95-black) var(--win95-white) var(--win95-white) var(--win95-black);
      box-shadow: none;
      outline: 1px dotted #000;
      outline-offset: -4px;
      padding: 1px 9px 0px 11px; /* Shift content to give pressed effect */
    }
    
    &:focus {
      outline: 1px dotted #000;
      outline-offset: -4px;
    }
  }
  
  /* Inset areas (like textareas, inputs) */
  .inset {
    border-width: 1px;
    border-style: solid;
    border-color: var(--win95-darkest-gray) var(--win95-white) var(--win95-white) var(--win95-darkest-gray);
    background-color: var(--win95-white);
  }
  
  /* Pixel-perfect rendering */
  * {
    image-rendering: pixelated;
    image-rendering: crisp-edges;
  }
  
  /* Text selection in Windows 95 style */
  ::selection {
    background-color: var(--win95-blue);
    color: var(--win95-white);
  }
`;

export default GlobalStyles; 